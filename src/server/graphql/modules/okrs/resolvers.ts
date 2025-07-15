import { OkrService } from "./service";
import { Types } from "mongoose";
import { IOKR } from "@/server/database/interfaces/IOKR";
import { IStartup } from "@/server/database/interfaces/IStartup";

export const okrsResolvers = {
  Query: {
    okrs: async (_: undefined, { userId }: { userId?: string }) => {
      return await OkrService.getOkrs(userId);
    },
    okr: async (_: undefined, { id }: { id: string }) => {
      return await OkrService.getOkrById(id);
    },
    draftOkrs: async () => {
      return await OkrService.getDraftOkrs();
    },
    noDraftOkrs: async () => {
      return await OkrService.getNoDraftOkrs();
    }
  },

  Mutation: {
    createOKR: async (
      _: undefined,
      {
        input,
        createdBy,
      }: {
        input: {
          name: string;
          description: string;
          status:string
          startDate?: Date;
          endDate?: Date;
        };
        createdBy: string;
      }
    ) => {
      return await OkrService.createOKR(input, createdBy);
    },

    updateOKR: async (
      _: undefined,
      {
        id,
        input,
      }: {
        id: string;
        input: {
          name?: string;
          description?: string;
          status?: string;
          startDate?: Date;
          endDate?: Date;
        };
      }
    ) => {
      return await OkrService.updateOKR(id, input);
    },

    deleteOKR: async (_: undefined, { id }: { id: string }) => {
      return await OkrService.deleteOKR(new Types.ObjectId(id));
    },
  },

  OKR: {
    startups: async (parent: IOKR): Promise<IStartup[]> => {
      if (parent.startups && parent.startups.length > 0) {
        // Verificar si el primer elemento es un documento poblado (no solo ObjectId)
        const firstStartup = parent.startups[0] as any;
        if (firstStartup && typeof firstStartup === 'object' && 'name' in firstStartup) {
          // Ya está poblado, verificar si tiene sprints
          if (firstStartup.sprints !== undefined) {
            return parent.startups as unknown as IStartup[];
          }
        }
      }
      const populated = await parent.populate({
        path: "startups",
        populate: {
          path: "sprints.modules.responsible"
        }
      });
      return populated.startups as unknown as IStartup[];
    },
    createdBy: (parent: IOKR) => {
      if (parent.createdBy) return parent.createdBy;
      return parent.populate("createdBy").then((o: IOKR) => o.createdBy);
    },
  },
};
