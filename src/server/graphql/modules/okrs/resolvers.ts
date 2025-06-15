import dbConnect from "@/server/database/dbConnect";
import { OKR } from "../../../database/models/Okr";

export const okrsResolvers = {
  Query: {
    getOKRs: async () => {
      await dbConnect();
      return await OKR.find();
    },
    getOKR: async (_: undefined, { id }: { id: string }) => {
      await dbConnect();
      return await OKR.findById(id);
    },
  },

  Mutation: {
    createOKR: async (
      _: undefined,
      {
        title,
        description,
        owner,
        status,
        startDate,
        endDate,
        userId,
      }: {
        title: string;
        description: string;
        owner: string;
        status?: string;
        startDate: string;
        endDate: string;
        userId: string;
      }
    ) => {
      await dbConnect();
      const newOKR = new OKR({
        title,
        description,
        owner,
        status,
        startDate,
        endDate,
        userId,
      });
      return await newOKR.save();
    },

    updateOKR: async (
      _: undefined,
      {
        id,
        ...updates
      }: {
        id: string;
        title?: string;
        description?: string;
        owner?: string;
        status?: string;
        startDate?: string;
        endDate?: string;
        userId?: string;
      }
    ) => {
      await dbConnect();
      return await OKR.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteOKR: async (_: undefined, { id }: { id: string }) => {
      await dbConnect();
      const result = await OKR.findByIdAndDelete(id);
      return !!result;
    },
  },
};
