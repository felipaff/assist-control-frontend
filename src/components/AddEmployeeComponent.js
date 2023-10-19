import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

export const AddEmployeeComponent = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: "",
        positionId: "",
        contractTypeId: "",
    });
    const [positions, setPositions] = useState([]);
    const [contractTypes, setContractTypes] = useState([]);
    const { id } = useParams();

    // Fetch positions and contract types when the component loads
    useEffect(() => {
        // Fetch positions
        EmployeeService.getPositions()
            .then(response => {
                setPositions(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // Fetch contract types
        EmployeeService.getContractTypes()
            .then(response => {
                setContractTypes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Fetch employee data if editing an existing employee
    useEffect(() => {
        if (id) {
            // Fetch employee data for editing
            EmployeeService.getEmployeeById(id)
                .then((response) => {
                    const { name, position, contractType } = response.data;
                    setEmployee({
                        name: name,
                        positionId: position.id,
                        contractTypeId: contractType.id,
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [id]);

    const saveEmployee = (e) => {
        e.preventDefault();
        const newEmployee = {
            name: employee.name,
            position: { id: employee.positionId },
            contractType: { id: employee.contractTypeId },
        };

        if (id) {
            // Update an existing employee
            EmployeeService.updateEmployee(id, newEmployee)
                .then((response) => {
                    console.log(response.data);
                    navigate("/employees");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // Create a new employee
            EmployeeService.createEmployee(newEmployee)
                .then((response) => {
                    console.log(response.data);
                    navigate("/employees");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const title = id ? "Update Employee" : "Employee Registration";

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">{title}</h2>
                        <div className="card-body">
                            <form onSubmit={saveEmployee}>
                                <div className="form-group mb-2">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        name="nameEmployee"
                                        className="form-control"
                                        value={employee.name}
                                        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Position</label>
                                    <select
                                        name="position"
                                        className="form-control"
                                        value={employee.positionId}
                                        onChange={(e) => setEmployee({ ...employee, positionId: e.target.value })}
                                    >
                                        <option value="">Select Position</option>
                                        {positions.map((position) => (
                                            <option key={position.id} value={position.id}>
                                                {position.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Contract Type</label>
                                    <select
                                        name="contractType"
                                        className="form-control"
                                        value={employee.contractTypeId}
                                        onChange={(e) => setEmployee({ ...employee, contractTypeId: e.target.value })}
                                    >
                                        <option value="">Select Contract Type</option>
                                        {contractTypes.map((contractType) => (
                                            <option key={contractType.id} value={contractType.id}>
                                                {contractType.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/employees" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
