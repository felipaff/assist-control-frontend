import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

export const ListEmployeesComponent = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        listEmployees()
    }, []);

    const listEmployees = () =>{
        EmployeeService.getAllEmployees().then(response => {
            setEmployees(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteEmployee = (employee) => {
        if (employee && employee.id) {
            EmployeeService.deleteEmployee(employee.id).then((response) => {
                listEmployees();
            }).catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <div className="container">
            <h2 className="text-center">Employees List</h2>
            <Link to="/add-employee" className="btn btn-primary mb-2">Add Employee</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Contract Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                         console.log("Employee Position:", employee.position),
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position ? employee.position.name : 'N/A'}</td>
                            <td>{employee.contractType ? employee.contractType.name : 'N/A'}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-employee/${employee.id}`}>Update</Link>
                                <button style={{marginLeft:"10px"}} className="btn btn-danger" onClick={() => deleteEmployee(employee)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ListEmployeesComponent;