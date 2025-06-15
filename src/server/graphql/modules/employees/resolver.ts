import { EmployeeService } from "./service";

export const employeeResolvers = {
  Query: {
    employees: async () => {
      return await EmployeeService.getEmployees();
    },
    employee: async (_: undefined, { id }: { id: string }) => {
      return await EmployeeService.getEmployee(id);
    },
  },

  Mutation: {
    createEmployee: async (
      _: undefined,
      { 
        userData,
        employeeData
      }: {
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
          status?: 'active' | 'inactive' | 'on_leave';
          hireDate?: Date;
        }
      }
    ) => {
      return await EmployeeService.createEmployee(userData, employeeData);
    },

    updateEmployee: async (
      _: undefined,
      { id, updateData }: { id: string, updateData: Partial<{
        position: string;
        department: string;
        skills: string[];
        contactInfo: {
          phone: string;
          emergencyContact: string;
        };
        status: 'active' | 'inactive' | 'on_leave';
      }>}
    ) => {
      return await EmployeeService.updateEmployee(id, updateData);
    },

    deleteEmployee: async (_: undefined, { id }: { id: string }) => {
      return await EmployeeService.deleteEmployee(id);
    },
  },
};