import dbConnect from "@/server/database/dbConnect";
import { Startup } from "@/server/database/models";
import { IStartup, StartupStatus } from "@/server/database/interfaces/IStartup";
import { ISprint, IModule } from "@/server/database/interfaces/ISprint";
import { Types } from "mongoose";

export class StartupService {
  /**
   * Obtiene todas las startups con información poblada
   */
  static async getAllStartups(): Promise<IStartup[]> {
    await dbConnect();
    return await Startup.find()
      .populate('okrId')
      .populate('teamId')
      .populate('sprints.modules.responsible')
      .sort({ createdAt: -1 });
  }

  /**
   * Obtiene una startup por ID
   */
  static async getStartupById(id: string): Promise<IStartup | null> {
    await dbConnect();
    return await Startup.findById(id)
      .populate('okrId')
      .populate('teamId')
      .populate('sprints.modules.responsible');
  }

  /**
   * Obtiene startups por OKR
   */
  static async getStartupsByOkr(okrId: string): Promise<IStartup[]> {
    await dbConnect();
    return await Startup.find({ okrId })
      .populate('okrId')
      .populate('teamId')
      .populate('sprints.modules.responsible')
      .sort({ createdAt: -1 });
  }

  /**
   * Obtiene startups por equipo
   */
  static async getStartupsByTeam(teamId: string): Promise<IStartup[]> {
    await dbConnect();
    return await Startup.find({ teamId })
      .populate('okrId')
      .populate('teamId')
      .populate('sprints.modules.responsible')
      .sort({ createdAt: -1 });
  }

  /**
   * Obtiene startups por estado
   */
  static async getStartupsByStatus(status: StartupStatus): Promise<IStartup[]> {
    await dbConnect();
    return await Startup.find({ status })
      .populate('okrId')
      .populate('teamId')
      .populate('sprints.modules.responsible')
      .sort({ createdAt: -1 });
  }

  /**
   * Obtiene startups pendientes de revisión (para admins)
   */
  static async getPendingReviewStartups(): Promise<IStartup[]> {
    await dbConnect();
    return await Startup.find({ status: 'idea_pending_review' })
      .populate('okrId')
      .populate('teamId')
      .sort({ createdAt: 1 }); // Las más antiguas primero
  }

  /**
   * Crea una nueva startup
   */
  static async createStartup(input: {
    name: string;
    description: string;
    okrId: string;
    teamId: string;
    sprints: Array<{
      orderNumber: number;
      name: string;
    }>;
  }): Promise<IStartup> {
    await dbConnect();
    
    const startup = await Startup.create({
      name: input.name,
      description: input.description,
      okrId: new Types.ObjectId(input.okrId),
      teamId: new Types.ObjectId(input.teamId),
      status: 'idea_pending_review',
      sprints: input.sprints.map(sprint => ({
        orderNumber: sprint.orderNumber,
        name: sprint.name,
        status: 'planned',
        modules: []
      }))
    });

    return await startup.populate(['okrId', 'teamId']);
  }

  /**
   * Actualiza el estado de una startup (solo admins)
   */
static async updateStartupStatus(
  id: string,
  status: StartupStatus,
  observation?: string
): Promise<IStartup | null> {
  await dbConnect();

  const updateData: {
    $set?: { status: string; observation?: string };
    $unset?: { observation: number };
  } = {};

  // Si el estado es 'idea_observed' y hay una observación, se establece ambos campos
  if (status === 'idea_observed' && observation) {
    updateData.$set = {
      status,
      observation,
    };
  } else {
    // Se establece el estado, pero se elimina la observación si no aplica
    updateData.$set = { status };
    updateData.$unset = { observation: 1 };
  }

  return await Startup.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  ).populate(['okrId', 'teamId', 'sprints.modules.responsible']);
}


  /**
   * Actualiza información básica de una startup
   */
  static async updateStartup(id: string, input: {
    name?: string;
    description?: string;
    okrId?: string;
    teamId?: string;
  }): Promise<IStartup | null> {
    await dbConnect();
    
    const updateData: any = {};
    if (input.name) updateData.name = input.name;
    if (input.description) updateData.description = input.description;
    if (input.okrId) updateData.okrId = new Types.ObjectId(input.okrId);
    if (input.teamId) updateData.teamId = new Types.ObjectId(input.teamId);

    return await Startup.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate(['okrId', 'teamId', 'sprints.modules.responsible']);
  }

  /**
   * Actualiza un sprint específico (cuando pasa a "in_progress")
   */
  static async updateSprint(startupId: string, sprintOrderNumber: number, sprintData: {
    deliverable?: string;
    startDate?: Date;
    endDate?: Date;
    status?: 'planned' | 'in_progress' | 'completed' | 'delayed';
  }): Promise<IStartup | null> {
    await dbConnect();
    
    const startup = await Startup.findById(startupId);
    if (!startup) return null;

      const sprintIndex = startup.sprints.findIndex((s: ISprint) => s.orderNumber === sprintOrderNumber);
    if (sprintIndex === -1) return null;

    if (sprintData.deliverable) startup.sprints[sprintIndex].deliverable = sprintData.deliverable;
    if (sprintData.startDate) startup.sprints[sprintIndex].startDate = sprintData.startDate;
    if (sprintData.endDate) startup.sprints[sprintIndex].endDate = sprintData.endDate;
    if (sprintData.status) startup.sprints[sprintIndex].status = sprintData.status;

    await startup.save();
    return await startup.populate(['okrId', 'teamId', 'sprints.modules.responsible']);
  }

  /**
   * Agrega un módulo a un sprint
   */
  static async addModuleToSprint(startupId: string, sprintOrderNumber: number, moduleData: {
    name: string;
    task: string;
    responsible: string;
    deadline: Date;
  }): Promise<IStartup | null> {
    await dbConnect();
    
    const startup = await Startup.findById(startupId);
    if (!startup) return null;

    const sprintIndex = startup.sprints.findIndex((s: ISprint) => s.orderNumber === sprintOrderNumber);
    if (sprintIndex === -1) return null;

    const newModule: IModule = {
      name: moduleData.name,
      task: moduleData.task,
      responsible: new Types.ObjectId(moduleData.responsible),
      status: 'pending',
      deadline: moduleData.deadline
    };

    startup.sprints[sprintIndex].modules.push(newModule);
    await startup.save();
    
    return await startup.populate(['okrId', 'teamId', 'sprints.modules.responsible']);
  }

  /**
   * Actualiza el estado de un módulo
   */
  static async updateModuleStatus(startupId: string, sprintOrderNumber: number, moduleIndex: number, status: 'pending' | 'in_progress' | 'completed' | 'blocked'): Promise<IStartup | null> {
    await dbConnect();
    
    const startup = await Startup.findById(startupId);
    if (!startup) return null;

    const sprintIndex = startup.sprints.findIndex((s: ISprint) => s.orderNumber === sprintOrderNumber);
    if (sprintIndex === -1 || !startup.sprints[sprintIndex].modules[moduleIndex]) return null;

    startup.sprints[sprintIndex].modules[moduleIndex].status = status;
    await startup.save();
    
    return await startup.populate(['okrId', 'teamId', 'sprints.modules.responsible']);
  }

  /**
   * Elimina una startup
   */
  static async deleteStartup(id: string): Promise<boolean> {
    await dbConnect();
    const result = await Startup.findByIdAndDelete(id);
    return !!result;
  }
}