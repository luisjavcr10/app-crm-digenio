import dbConnect from "@/server/database/dbConnect";
import { OKR, User } from "@/server/database/models";
import { Types } from "mongoose";

export class OkrService {
  static async getOkrs(userId?: string) {
    await dbConnect();
    
    let filter = {};
    
    // Si se proporciona userId, verificar si es admin
    if (userId) {
      const user = await User.findById(userId);
      const isAdmin = user?.roles?.includes('ADMIN');
      
      // Si no es admin, excluir los borradores
      if (!isAdmin) {
        filter = { status: { $ne: 'draft' } };
      }
    } else {
      // Si no se proporciona userId, excluir borradores por defecto
      filter = { status: { $ne: 'draft' } };
    }
    
    const okrs = await OKR.find(filter)
      .populate('startups')
      .populate('createdBy');
    
    return okrs;
  }

  static async getOkrById(id: string) {
    await dbConnect();
    return await OKR.findById(id)
      .populate('owner')
      .populate('createdBy');
  }

  static async getDraftOkrs() {
    await dbConnect();
    return await OKR.find({status:"draft"})
      .populate('startups')
      .populate('createdBy');
  }

  static async getNoDraftOkrs() {
    await dbConnect();
    return await OKR.find({status:{$ne:"draft"}})
      .populate('startups')
      .populate('createdBy');
  }


  static async createOKR(
    input: {
      name: string;
      description: string;
      startDate?: Date;
      endDate?: Date;
      status:string
    },
    createdBy: string
  ) {
    await dbConnect();
    const newOkr = await OKR.create({
      ...input,
      createdBy
    });
    await newOkr.populate('createdBy');
    await newOkr.populate('startups');
    return newOkr;
  }

  static async updateOKR(
    id: string,
    input: {
      name?: string;
      description?: string;
      startDate?: Date;
      endDate?: Date;
      status?: string;
    }
  ) {
    await dbConnect();
    const updatedOkr = await OKR.findByIdAndUpdate(
      id,
      { ...input },
      { new: true }
    )
      .populate('startups')
      .populate('createdBy');
    
    return updatedOkr;
  }

  static async deleteOKR(id: Types.ObjectId) {
    await dbConnect();
    const result = await OKR.findByIdAndDelete(id);
    return !!result;
  }
}