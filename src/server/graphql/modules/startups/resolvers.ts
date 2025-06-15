import dbConnect from "@/server/db/dbConnect";
import { Startup, IStartup } from "../../../db/models/Startup";
import { GraphQLError } from "graphql";

export const startupResolvers = {
  Query: {
    getStartup: async (
      _: unknown, 
      { id }: { id: string }
    ): Promise<IStartup> => {
      await dbConnect();
      const startup = await Startup.findById(id);
      if (!startup) throw new GraphQLError("Startup no encontrada");
      return startup;
    },

    getAllStartups: async (): Promise<IStartup[]> => {
      await dbConnect();
      return await Startup.find().sort({ createdAt: -1 });
    },

    getStartupsByClient: async (
      _: unknown, 
      { client }: { client: string }
    ): Promise<IStartup[]> => {
      await dbConnect();
      return await Startup.find({ client }).sort({ createdAt: -1 });
    },

    getStartupsByResponsible: async (
      _: unknown, 
      { responsible }: { responsible: string }
    ): Promise<IStartup[]> => {
      await dbConnect();
      return await Startup.find({ responsible }).sort({ createdAt: -1 });
    },
  },

  Mutation: {
    createStartup: async (
      _: unknown,
      args: {
        client: string;
        name: string;
        description: string;
        responsible: string;
        monthlyMetric: string;
        metric: string;
        currentValue?: number;
        expectedValue: number;
      }
    ): Promise<IStartup> => {
      await dbConnect();
      
      if ((args.currentValue || 0) > args.expectedValue) {
        throw new GraphQLError("El valor actual no puede superar al esperado");
      }

      return await Startup.create({
        ...args,
        currentValue: args.currentValue || 0,
      });
    },

    updateStartup: async (
      _: unknown,
      args: {
        id: string;
        client?: string;
        name?: string;
        description?: string;
        responsible?: string;
        monthlyMetric?: string;
        metric?: string;
        currentValue?: number;
        expectedValue?: number;
      }
    ): Promise<IStartup> => {
      await dbConnect();
      
      const updatedStartup = await Startup.findByIdAndUpdate(
        args.id,
        { $set: args },
        { new: true }
      );
      
      if (!updatedStartup) throw new GraphQLError("Startup no encontrada");
      return updatedStartup;
    },

    deleteStartup: async (
      _: unknown, 
      { id }: { id: string }
    ): Promise<IStartup> => {
      await dbConnect();
      const deletedStartup = await Startup.findByIdAndDelete(id);
      if (!deletedStartup) throw new GraphQLError("Startup no encontrada");
      return deletedStartup;
    },

    updateStartupMetrics: async (
      _: unknown,
      { id, currentValue }: { id: string; currentValue: number }
    ): Promise<IStartup> => {
      await dbConnect();
      const startup = await Startup.findByIdAndUpdate(
        id,
        { currentValue },
        { new: true }
      );
      if (!startup) throw new GraphQLError("Startup no encontrada");
      return startup;
    },
  },
};