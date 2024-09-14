using InterviewTest.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InterviewTest.Model
{
    public interface IEmployeeService
    {
        Task<List<EmployeeModel>> GetEmployees();
        Task<bool> InsertEmployee(EmployeeModel employee);
        Task<bool> UpdateEmployee(EmployeeModel employee);
        Task<bool> DeleteEmployee(string name);
        Task<List<EmployeeModel>> EmployeeDataAnalysis();
    }
}
