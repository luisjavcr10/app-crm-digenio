import dbConnect from "@/server/database/dbConnect";
import { OKR } from "@/server/database/models";
import { Types } from "mongoose";

export class OkrService {
  static async getOkrs() {
    await dbConnect();
    const okrs = await OKR.find()
      .populate('startups')
      .populate('createdBy');
    console.log(JSON.stringify(okrs, null, 2));
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

    return newOkr;
  }

  static async deleteOKR(id: Types.ObjectId) {
    await dbConnect();
    const result = await OKR.findByIdAndDelete(id);
    return !!result;
  }
}