import { StartupService } from "./service";
import { Document } from "mongoose";
import { IOKR } from "@/server/database/interfaces/IOKR";
import { ITeam } from "@/server/database/interfaces/ITeam";
import { IStartup, StartupStatus } from "@/server/database/interfaces/IStartup";
import { GraphQLError } from "graphql";

type StartupParent = Document<unknown, IStartup> &
  IStartup & {
    okrInfo: IOKR[];
    teamInfo: ITeam[];
  };

/**
 * Convierte el estado de la base de datos al formato GraphQL
 */
const mapStatusToGraphQL = (status: StartupStatus): string => {
  const statusMap: Record<StartupStatus, string> = {
    'idea_pending_review': 'IDEA_PENDING_REVIEW',
    'idea_observed': 'IDEA_OBSERVED',
    'idea_rejected': 'IDEA_REJECTED',
    'in_progress': 'IN_PROGRESS',
    'completed': 'COMPLETED',
    'paused': 'PAUSED'
  };
  return statusMap[status];
};

/**
 * Convierte el estado de GraphQL al formato de la base de datos
 */
const mapStatusFromGraphQL = (status: string): StartupStatus => {
  const statusMap: Record<string, StartupStatus> = {
    'IDEA_PENDING_REVIEW': 'idea_pending_review',
    'IDEA_OBSERVED': 'idea_observed',
    'IDEA_REJECTED': 'idea_rejected',
    'IN_PROGRESS': 'in_progress',
    'COMPLETED': 'completed',
    'PAUSED': 'paused'
  };
  return statusMap[status];
};

export const startupResolvers = {
  Query: {
    /**
     * Obtiene una startup por ID
     */
    getStartup: async (
      _: unknown, 
      { id }: { id: string }
    ): Promise<IStartup> => {
      const startup = await StartupService.getStartupById(id);
      if (!startup) throw new GraphQLError("Startup no encontrada");
      return startup;
    },

    /**
     * Obtiene todas las startups
     */
    getAllStartups: async (): Promise<IStartup[]> => {
      return await StartupService.getAllStartups();
    },

    /**
     * Obtiene startups por OKR
     */
    getStartupsByOkr: async (
      _: unknown, 
      { okrId }: { okrId: string }
    ): Promise<IStartup[]> => {
      return await StartupService.getStartupsByOkr(okrId);
    },

    /**
     * Obtiene startups por equipo
     */
    getStartupsByTeam: async (
      _: unknown, 
      { teamId }: { teamId: string }
    ): Promise<IStartup[]> => {
      return await StartupService.getStartupsByTeam(teamId);
    },

    /**
     * Obtiene startups por estado
     */
    getStartupsByStatus: async (
      _: unknown, 
      { status }: { status: string }
    ): Promise<IStartup[]> => {
      const dbStatus = mapStatusFromGraphQL(status);
      return await StartupService.getStartupsByStatus(dbStatus);
    },

    /**
     * Obtiene startups pendientes de revisión
     */
    getPendingReviewStartups: async (): Promise<IStartup[]> => {
      return await StartupService.getPendingReviewStartups();
    },
  },

  Mutation: {
    /**
     * Crea una nueva startup
     */
    createStartup: async (
      _: unknown,
      { input }: {
        input: {
          name: string;
          description: string;
          okrId: string;
          teamId: string;
          sprints: Array<{
            orderNumber: number;
            name: string;
          }>;
        };
      }
    ): Promise<IStartup> => {
      return await StartupService.createStartup(input);
    },

    /**
     * Actualiza información básica de una startup
     */
    updateStartup: async (
      _: unknown,
      { id, input }: {
        id: string;
        input: {
          name?: string;
          description?: string;
          okrId?: string;
          teamId?: string;
        };
      }
    ): Promise<IStartup> => {
      const updatedStartup = await StartupService.updateStartup(id, input);
      if (!updatedStartup) throw new GraphQLError("Startup no encontrada");
      return updatedStartup;
    },

    /**
     * Actualiza el estado de una startup (solo admins)
     */
    updateStartupStatus: async (
      _: unknown,
      { id, status, observation }: {
        id: string;
        status: string;
        observation?: string;
      }
    ): Promise<IStartup> => {
      const dbStatus = mapStatusFromGraphQL(status);
      const updatedStartup = await StartupService.updateStartupStatus(id, dbStatus, observation);
      if (!updatedStartup) throw new GraphQLError("Startup no encontrada");
      return updatedStartup;
    },

    /**
     * Actualiza un sprint específico
     */
    updateSprint: async (
      _: unknown,
      { startupId, sprintOrderNumber, input }: {
        startupId: string;
        sprintOrderNumber: number;
        input: {
          deliverable?: string;
          startDate?: string;
          endDate?: string;
          status?: string;
        };
      }
    ): Promise<IStartup> => {
      const sprintData: any = {};
      if (input.deliverable) sprintData.deliverable = input.deliverable;
      if (input.startDate) sprintData.startDate = new Date(input.startDate);
      if (input.endDate) sprintData.endDate = new Date(input.endDate);
      if (input.status) {
        const statusMap: Record<string, string> = {
          'PLANNED': 'planned',
          'IN_PROGRESS': 'in_progress',
          'COMPLETED': 'completed',
          'DELAYED': 'delayed'
        };
        sprintData.status = statusMap[input.status];
      }

      const updatedStartup = await StartupService.updateSprint(startupId, sprintOrderNumber, sprintData);
      if (!updatedStartup) throw new GraphQLError("Startup o sprint no encontrado");
      return updatedStartup;
    },

    /**
     * Agrega un módulo a un sprint
     */
    addModuleToSprint: async (
      _: unknown,
      { startupId, sprintOrderNumber, input }: {
        startupId: string;
        sprintOrderNumber: number;
        input: {
          name: string;
          task: string;
          responsible: string;
          deadline: string;
        };
      }
    ): Promise<IStartup> => {
      const moduleData = {
        ...input,
        deadline: new Date(input.deadline)
      };

      const updatedStartup = await StartupService.addModuleToSprint(startupId, sprintOrderNumber, moduleData);
      if (!updatedStartup) throw new GraphQLError("Startup o sprint no encontrado");
      return updatedStartup;
    },

    /**
     * Actualiza el estado de un módulo
     */
    updateModuleStatus: async (
      _: unknown,
      { startupId, sprintOrderNumber, moduleIndex, status }: {
        startupId: string;
        sprintOrderNumber: number;
        moduleIndex: number;
        status: string;
      }
    ): Promise<IStartup> => {
      const statusMap: Record<string, 'pending' | 'in_progress' | 'completed' | 'blocked'> = {
        'PENDING': 'pending',
        'IN_PROGRESS': 'in_progress',
        'COMPLETED': 'completed',
        'BLOCKED': 'blocked'
      };
      
      const dbStatus = statusMap[status];
      const updatedStartup = await StartupService.updateModuleStatus(startupId, sprintOrderNumber, moduleIndex, dbStatus);
      if (!updatedStartup) throw new GraphQLError("Startup, sprint o módulo no encontrado");
      return updatedStartup;
    },

    /**
     * Elimina una startup
     */
    deleteStartup: async (
      _: unknown, 
      { id }: { id: string }
    ): Promise<boolean> => {
      return await StartupService.deleteStartup(id);
    },
  },

  /**
   * Resolvers para campos específicos del tipo Startup
   */
  Startup: {
    status: (parent: IStartup) => mapStatusToGraphQL(parent.status),

  },

  /**
   * Resolvers para campos específicos del tipo Sprint
   */
  Sprint: {
    status: (parent: any) => {
      const statusMap: Record<string, string> = {
        'planned': 'PLANNED',
        'in_progress': 'IN_PROGRESS',
        'completed': 'COMPLETED',
        'delayed': 'DELAYED'
      };
      return statusMap[parent.status];
    },
  },

  /**
   * Resolvers para campos específicos del tipo Module
   */
  Module: {
    status: (parent: any) => {
      const statusMap: Record<string, string> = {
        'pending': 'PENDING',
        'in_progress': 'IN_PROGRESS',
        'completed': 'COMPLETED',
        'blocked': 'BLOCKED'
      };
      return statusMap[parent.status];
    },
    responsible: async (parent: any) => {
      if (parent.responsible && typeof parent.responsible === 'object') {
        return parent.responsible;
      }
      return parent.populate("responsible").then((m: any) => m.responsible);
    },
  },
};