import dbConnect from "@/server/database/dbConnect";
import { OKR } from "@/server/database/models";
import { Types } from "mongoose";

export class OkrService {
  static async getOkrs() {
    await dbConnect();
    return await OKR.find()
      .populate('owner')
      .populate('createdBy');
  }

  static async getOkrById(id: string) {
    await dbConnect();
    return await OKR.findById(id)
      .populate('owner')
      .populate('createdBy');
  }

  static async getTeamOkrs(teamId: string) {
    await dbConnect();
    return await OKR.find({ owner: teamId, status: { $ne: 'draft' } })
      .populate('owner')
      .populate('createdBy');
  }

  static async getDraftOkrs(teamId: string) {
    await dbConnect();
    return await OKR.find({ owner: teamId, status: 'draft' })
      .populate('owner')
      .populate('createdBy');
  }

  static async createOKR(
    input: {
      title: string;
      description: string;
      owner: Types.ObjectId;
      startDate: Date;
      endDate: Date;
    },
    createdBy: string
  ) {
    await dbConnect();
    const newOkr = await OKR.create({
      ...input,
      status: "pending",
      createdBy
    });

    return newOkr;
  }

  static async createDraftOKR(
    input: {
      title: string;
      description: string;
      owner: Types.ObjectId;
    },
    createdBy: string
  ) {
    await dbConnect();
    return await OKR.create({
      ...input,
      status: 'draft',
      createdBy,
    });
  }

  static async publishDraft(
    id: Types.ObjectId,
    startDate: Date,
    endDate: Date
  ) {
    await dbConnect();
    return await OKR.findByIdAndUpdate(
      id,
      {
        status: 'pending',
        startDate,
        endDate
      },
      { new: true }
    ).populate('owner').populate('createdBy');
  }

  static async updateOKR(
    id: Types.ObjectId,
    updates: {
      title?: string;
      description?: string;
      status?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ) {
    await dbConnect();
    return await OKR.findByIdAndUpdate(id, updates, { new: true })
      .populate('owner')
      .populate('createdBy');
  }

  static async deleteOKR(id: Types.ObjectId) {
    await dbConnect();
    const result = await OKR.findByIdAndDelete(id);
    return !!result;
  }
}