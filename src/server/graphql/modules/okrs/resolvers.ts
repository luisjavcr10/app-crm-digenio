import { OkrService } from "./service";
import { Types } from "mongoose";
import { IOKR } from "@/server/database/interfaces/IOKR";

export const okrsResolvers = {
  Query: {
    okrs: async () => {
      return await OkrService.getOkrs();
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
    startups: async (parent: IOKR) => {
      if (parent.startups) return parent.startups;
      return parent.populate("startups").then((o: IOKR) => o.startups);
    },
    createdBy: (parent: IOKR) => {
      if (parent.createdBy) return parent.createdBy;
      return parent.populate("createdBy").then((o: IOKR) => o.createdBy);
    },
  },
};
