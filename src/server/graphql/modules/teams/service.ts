import { Employee, Team } from "@/server/database/models";
import dbConnect from "@/server/database/dbConnect";

export class TeamService {
  static async createTeam(
    name: string,
    description: string,
    managerId: string,
    membersIds: string[] = []
  ) {
    await dbConnect();
  
    // Verificar que el manager existe y poblar su userId
    const manager = await Employee.findById(managerId).populate('userId');
    if (!manager) {
      throw new Error("El empleado manager no existe");
    }
  
    // Crear el equipo incluyendo al manager como miembro
    const newTeam = await Team.create({
      name,
      description,
      manager: managerId,
      members: [...new Set([managerId, ...membersIds])],
    });
  
    // Actualizar los empleados con la referencia al nuevo equipo
    await Employee.updateMany(
      { _id: { $in: newTeam.members } },
      { $addToSet: { teams: newTeam._id } }
    );
  
    // Retornar el equipo creado con toda la información poblada
    const populatedTeam = await Team.findById(newTeam._id)
      .populate({
        path: 'managerInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      })
      .populate({
        path: 'membersInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      });
  
    return populatedTeam;
  };

  static async getTeamById(id: string) {
    await dbConnect();
    return await Team.findById(id)
      .populate({
        path: 'managerInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      })
      .populate({
        path: 'membersInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      });
  };

  static async getAllTeams() {
    await dbConnect();
    return await Team.find()
      .populate({
        path: 'managerInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      })
      .populate({
        path: 'membersInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      });
  };

  static async updateTeam(
    id: string,
    updateData: {
      name?: string;
      description?: string;
      manager?: string;
      members?: string[];
      status?: "active" | "inactive" | "archived";
    }
  ) {
    await dbConnect();

    const team = await Team.findById(id);
    if (!team) {
      throw new Error("Equipo no encontrado");
    }

    // Si se actualiza el manager, asegurarse de que está en los miembros
    if (updateData.manager) {
      updateData.members = [
        ...new Set([
          updateData.manager,
          ...(updateData.members || team.members.map((m: string) => m.toString())),
        ]),
      ];
    }

    const updatedTeam = await Team.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate({
        path: 'managerInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      })
      .populate({
        path: 'membersInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      });

    // Actualizar referencias en empleados si cambian los miembros
    if (updateData.members) {
      // Remover el equipo de los empleados que ya no son miembros
      await Employee.updateMany(
        { 
          teams: team._id,
          _id: { $nin: updateData.members }
        },
        { $pull: { teams: team._id } }
      );

      // Agregar el equipo a los nuevos miembros
      await Employee.updateMany(
        { 
          _id: { $in: updateData.members },
          teams: { $ne: team._id }
        },
        { $addToSet: { teams: team._id } }
      );
    }

    return updatedTeam;
  };
  
  static async deleteTeam(id: string) {
    await dbConnect();

    // Primero eliminar las referencias en los empleados
    await Employee.updateMany(
      { teams: id },
      { $pull: { teams: id } }
    );

    return await Team.findByIdAndDelete(id);
  }

  // Método adicional para obtener equipos con filtros
  static async getTeamsWithFilters(filters: {
    status?: "active" | "inactive" | "archived";
    manager?: string;
  }) {
    await dbConnect();
    
    const query: any = {};
    if (filters.status) query.status = filters.status;
    if (filters.manager) query.manager = filters.manager;

    return await Team.find(query)
      .populate({
        path: 'managerInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      })
      .populate({
        path: 'membersInfo',
        populate: {
          path: 'userId',
          select: 'email name role status'
        }
      });
  }
}