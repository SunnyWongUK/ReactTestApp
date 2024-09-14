using InterviewTest.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InterviewTest.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [Route("/API/Employee/Employees")]
        public async Task<IActionResult> Employees()
        {
            return Ok(await _employeeService.GetEmployees());
        }
        
        [HttpPost]
        [Route("/API/Employee/InsertEmployee")]
        public async Task<IActionResult> InsertEmployee([FromBody] EmployeeModel model)
        {
            return Ok(await _employeeService.InsertEmployee(model));
        }

        [HttpPost]
        [Route("/API/Employee/UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeModel model)
        {
            return Ok(await _employeeService.UpdateEmployee(model));
        }

        [HttpDelete]
        [Route("/API/Employee/DeleteEmployee/{name}")]
        public async Task<IActionResult> DeleteEmployee(string name)
        {
            return Ok(await _employeeService.DeleteEmployee(name));
        }

        [HttpGet]
        [Route("/API/Employee/DataAnalysis")]
        public async Task<IActionResult> EmployeeDataAnalysisList()
        {
            return Ok(await _employeeService.EmployeeDataAnalysis());
        }
    }   
}
