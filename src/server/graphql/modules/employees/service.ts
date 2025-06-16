import mongoose from "mongoose";
import { Employee, User } from "@/server/database/models";
import { IEmployee } from "@/server/database/interfaces/IEmployee";
import dbConnect from "@/server/database/dbConnect";

export class EmployeeService {
  static async getEmployees() {
    await dbConnect();
    return await Employee.find()
      .populate("userId")
      .populate("teams");
  }

  static async getEmployee(id: string) {
    await dbConnect();
    return await Employee.findById(id)
      .populate("userId")
      .populate("teams");
  }

  static async createEmployee(
    userData: {
      name: string;
      email: string;
      password: string;
      role?: "ADMIN" | "USER";
    },
    employeeData: {
      position: string;
      department: string;
      skills: string[];
      contactInfo: {
        phone: string;
        emergencyContact: string;
      };
      status?: "active" | "inactive" | "on_leave";
      hireDate?: Date;
    }
  ) {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Crear User dentro de la transacción
      const user = new User(userData);
      await user.save({ session });

      // Crear Employee dentro de la misma transacción
      const employee = new Employee({
        userId: user._id,
        ...employeeData,
      });
      await employee.save({ session });

      // Si todo sale bien, hacer commit
      await session.commitTransaction();
      const populatedEmployee = await Employee.findById(employee._id)
        .populate("userId")
        .exec();

      return populatedEmployee;
    } catch (error) {
      // Si hay error, hacer rollback
      await session.abortTransaction();
      throw error; // Relanzar el error para manejo superior
    } finally {
      session.endSession();
    }
  }

  static async updateEmployee(id: string, updateData: Partial<IEmployee>) {
    await dbConnect();
    return await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("userId");
  }

  static async deleteEmployee(id: string) {
    await dbConnect();
    const employee = await Employee.findByIdAndDelete(id);
    if (employee) {
      await User.findByIdAndDelete(employee.userId);
    }
    return employee;
  }
}
