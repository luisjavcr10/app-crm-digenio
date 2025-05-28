import { User } from "../../models/User";
import dbConnect from "app/lib/db/dbConnect";

export const userResolvers = {
  Query: {
    users: async () => {
      await dbConnect();
      return await User.find();
    },
    user: async (_: undefined, { id }: { id: string }) => {
      await dbConnect();
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (
        _:undefined, 
        { email, password, firstName, lastName, role }:{email:string, password:string, firstName:string, lastName:string, role:string}) => {
      await dbConnect();
      const newUser = new User({ email, password, firstName, lastName, role });
      return await newUser.save();
    },
    updateUser: async (_:undefined, { id, ...updateData }:{id:string}) => {
      await dbConnect();
      return await User.findByIdAndUpdate(id, updateData, { new: true });
    },
    deleteUser: async (_:undefined, { id }: { id: string }) => {
      await dbConnect();
      return await User.findByIdAndDelete(id);
    },
  },
};