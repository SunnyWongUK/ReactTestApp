using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace InterviewTest.Model
{
    public class EmployeeService : IEmployeeService
    {
        public List<EmployeeModel> GetEmployeeDetail()
        {
            var employees = new List<EmployeeModel>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Name, Value FROM Employees ORDER BY Name ASC";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new EmployeeModel
                        {
                            Name = reader.GetString(0),
                            Value = reader.GetInt32(1)
                        });
                    }
                }
            }

            return employees;
        }

        public async Task<List<EmployeeModel>> GetEmployees()
        {
            return GetEmployeeDetail();
        }

        public async Task<bool> InsertEmployee(EmployeeModel employeeModel)
        {
            try
            {
                var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
                using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
                {
                    connection.Open();

                    using (var transaction = connection.BeginTransaction())
                    {
                        var updateTableCmd = connection.CreateCommand();
                        updateTableCmd.CommandText = "INSERT INTO Employees (Name, Value) VALUES (@Name, @Value)";

                        updateTableCmd.Parameters.AddWithValue("@Name", employeeModel.Name);
                        updateTableCmd.Parameters.AddWithValue("@Value", employeeModel.Value);

                        updateTableCmd.ExecuteNonQuery();

                        transaction.Commit();
                    }
                }

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> UpdateEmployee(EmployeeModel employeeModel)
        {
            try
            {
                var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
                using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
                {
                    connection.Open();

                    using (var transaction = connection.BeginTransaction())
                    {
                        var updateTableCmd = connection.CreateCommand();
                        updateTableCmd.CommandText = "UPDATE Employees SET Value = @Value WHERE Name = @Name";

                        updateTableCmd.Parameters.AddWithValue("@Name", employeeModel.Name);
                        updateTableCmd.Parameters.AddWithValue("@Value", employeeModel.Value);

                        updateTableCmd.ExecuteNonQuery();

                        transaction.Commit();
                    }
                }

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> DeleteEmployee(string name)
        {
            try
            {
                var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
                using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
                {
                    connection.Open();

                    using (var transaction = connection.BeginTransaction())
                    {
                        var updateTableCmd = connection.CreateCommand();
                        updateTableCmd.CommandText = "DELETE FROM Employees WHERE Name = @Name";

                        updateTableCmd.Parameters.AddWithValue("@Name", name);

                        updateTableCmd.ExecuteNonQuery();

                        transaction.Commit();
                    }
                }

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<List<EmployeeModel>> EmployeeDataAnalysis()
        {
            List<EmployeeModel> employeesForSum;
            List<EmployeeModel> employees = GetEmployeeDetail();
            int ValueForNameA;
            int ValueForNameB;
            int ValueForNameC;

            for (int i = 0; i < employees.Count; i++)
            {
                switch (employees[i].Name.ToUpper().Trim()[0])
                {
                    case 'E':
                        employees[i].Value += 1;
                        break;

                    case 'G':
                        employees[i].Value += 10;
                        break;

                    default:
                        employees[i].Value += 100;
                        break;
                }
            };

            employeesForSum = new List<EmployeeModel>();

            ValueForNameA = employees.Where(e => e.Name.Trim().ToUpper().StartsWith("A")).Sum(e => e.Value);
            if (ValueForNameA >= 11171)
            {
                employeesForSum.Add(new EmployeeModel() { Name = "Name Starts With A", Value = ValueForNameA });
            };

            ValueForNameB = employees.Where(e => e.Name.Trim().ToUpper().StartsWith("B")).Sum(e => e.Value);
            if (ValueForNameB >= 11171)
            {
                employeesForSum.Add(new EmployeeModel() { Name = "Name Starts With B", Value = ValueForNameB });
            };

            ValueForNameC = employees.Where(e => e.Name.Trim().ToUpper().StartsWith("C")).Sum(e => e.Value);
            if (ValueForNameC >= 11171)
            {
                employeesForSum.Add(new EmployeeModel() { Name = "Name Starts With C", Value = ValueForNameC });

            }

            return employeesForSum;
        }
    }
};