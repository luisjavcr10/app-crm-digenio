import { TeamService } from "./service";
import { Document } from "mongoose";
import { ITeam } from "@/server/database/interfaces/ITeam";
import { IEmployee } from "@/server/database/interfaces/IEmployee";

type TeamParent = Document<unknown, ITeam> &
  ITeam & {
    managerInfo?: IEmployee | null;
    membersInfo?: IEmployee[] | null;
  };

export const teamResolvers = {
  Query: {
    team: async (_: unknown, { id }: { id: string }) => {
      return await TeamService.getTeamById(id);
    },
    teams: async () => {
      return await TeamService.getAllTeams();
    },
  },
  Mutation: {
    createTeam: async (
      _: unknown,
      {
        input,
      }: {
        input: {
          name: string;
          description?: string;
          managerId: string;
          membersIds?: string[];
        };
      }
    ) => {
      return await TeamService.createTeam(
        input.name,
        input.description || "",
        input.managerId,
        input.membersIds || []
      );
    },
    updateTeam: async (
      _: unknown,
      {
        id,
        input,
      }: {
        id: string;
        input: {
          name?: string;
          description?: string;
          managerId?: string;
          membersIds?: string[];
          status?: "active" | "inactive" | "archived";
        };
      }
    ) => {
      return await TeamService.updateTeam(id, {
        ...input,
        ...(input.managerId && { manager: input.managerId }),
        ...(input.membersIds && { members: input.membersIds }),
      });
    },
    deleteTeam: async (_: unknown, { id }: { id: string }) => {
      await TeamService.deleteTeam(id);
      return true;
    },
  },
  Team: {
    manager: async (parent: TeamParent) => {
      const team = parent.managerInfo
        ? parent
        : await parent.populate("managerInfo");
      return team.managerInfo;
    },
    members: async (parent: TeamParent) => {
      const team = parent.membersInfo
        ? parent
        : await parent.populate("membersInfo");
      return team.membersInfo || [];
    },
  },
};
