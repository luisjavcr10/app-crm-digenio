import { OkrService } from "./service";
import { Types } from "mongoose";
import { IOKR, IOKRUpdate } from "@/server/database/interfaces/IOKR";

export const okrsResolvers = {
  Query: {
    okrs: async () => {
      return await OkrService.getOkrs();
    },
    okr: async (_: undefined, { id }: { id: string }) => {
      return await OkrService.getOkrById(id);
    },
    teamOkrs: async (_: undefined, { teamId }: { teamId: string }) => {
      return await OkrService.getTeamOkrs(teamId);
    },
    draftOkrs: async (_: undefined, { teamId }: { teamId: string }) => {
      return await OkrService.getDraftOkrs(teamId);
    },
  },

  Mutation: {
    createOKR: async (
      _: undefined,
      {
        input,
        createdBy,
      }: {
        input: {
          title: string;
          description: string;
          owner: Types.ObjectId;
          startDate: Date;
          endDate: Date;
        };
        createdBy: string;
      }
    ) => {
      return await OkrService.createOKR(input, createdBy);
    },

    createDraftOKR: async (
      _: undefined,
      {
        input,
        createdBy,
      }: {
        input: {
          title: string;
          description: string;
          owner: Types.ObjectId;
        };
        createdBy: string;
      }
    ) => {
      return await OkrService.createDraftOKR(
        input,
        createdBy
      );
    },

    publishDraft: async (
      _: undefined,
      {
        id,
        startDate,
        endDate,
      }: { id: string; startDate: string; endDate: string }
    ) => {
      return await OkrService.publishDraft(
        new Types.ObjectId(id),
        new Date(startDate),
        new Date(endDate)
      );
    },

    updateOKR: async (
      _: undefined,
      { id, input }: { 
        id: string; 
        input: {
          title?: string;
          description?: string;
          status?: 'draft' | 'pending' | 'in_progress' | 'completed';
          startDate?: Date; // Recibe string pero lo convertimos a Date
          endDate?: Date;
        }
      }
    ) => {
      const updates: IOKRUpdate = { ...input };

      if (input.startDate) updates.startDate = new Date(input.startDate);
      if (input.endDate) updates.endDate = new Date(input.endDate);

      return await OkrService.updateOKR(new Types.ObjectId(id), updates);
    },

    deleteOKR: async (_: undefined, { id }: { id: string }) => {
      return await OkrService.deleteOKR(new Types.ObjectId(id));
    },
  },

  OKR: {
    owner: (parent: IOKR) => {
      if (parent.owner) return parent.owner;
      return parent.populate("owner").then((o: IOKR) => o.owner);
    },
    createdBy: (parent: IOKR) => {
      if (parent.createdBy) return parent.createdBy;
      return parent.populate("createdBy").then((o: IOKR) => o.createdBy);
    },
  },
};
