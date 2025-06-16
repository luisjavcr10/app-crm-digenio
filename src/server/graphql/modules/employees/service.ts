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
      const user = new User(userData);
      await user.save({ session });
  
      const employee = new Employee({
        userId: user._id,
        ...employeeData,
      });
      await employee.save({ session });
  
      // Populate dentro de la transacción
      const populatedEmployee = await Employee.findById(employee._id)
        .populate("userId")
        .session(session)
        .exec();
  
      await session.commitTransaction();
      return populatedEmployee;
    } catch (error) {
      await session.abortTransaction();
      throw error;
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
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const employee = await Employee.findByIdAndDelete(id).session(session);
      if (employee && employee.userId) {
        await User.findByIdAndDelete(employee.userId).session(session);
      }
      await session.commitTransaction();
      return employee;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
