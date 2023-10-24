import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

export const ListEmployeesComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedPositionId, setSelectedPositionId] = useState("");
    const [selectedContractTypeId, setSelectedContractTypeId] = useState("");
    const [positions, setPositions] = useState([]); // State for positions
    const [contractTypes, setContractTypes] = useState([]); // State for contract types

    useEffect(() => {
        listEmployees();
        // Also fetch options for selectors when the component loads
        fetchPositions();
        fetchContractTypes();
    }, []);

    const listEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const deleteEmployee = (employee) => {
        if (employee && employee.id) {
            EmployeeService.deleteEmployee(employee.id).then((response) => {
                listEmployees();
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const fetchPositions = () => {
        // Make a request to get position options from the backend
        // and store the data in the positions state
        EmployeeService.getPositions().then((response) => {
            setPositions(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const fetchContractTypes = () => {
        // Make a request to get contract type options from the backend
        // and store the data in the contractTypes state
        EmployeeService.getContractTypes().then((response) => {
            setContractTypes(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleFilter = () => {
        EmployeeService.getEmployeesByFilters(selectedPositionId, selectedContractTypeId)
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <h2 className="text-center">Employees List</h2>
            <div className="button-container">
                {/* Add selection controls for position and contract type */}
                <select
                    onChange={(e) => setSelectedPositionId(e.target.value)}
                    value={selectedPositionId}
                >
                    <option value="">Filter by Position</option>
                    {positions.map((position) => (
                        <option key={position.id} value={position.id}>
                            {position.name}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setSelectedContractTypeId(e.target.value)}
                    value={selectedContractTypeId}
                >
                    <option value="">Filter by Contract Type</option>
                    {contractTypes.map((contractType) => (
                        <option key={contractType.id} value={contractType.id}>
                            {contractType.name}
                        </option>
                    ))}
                </select>

                &nbsp;
                <button onClick={handleFilter} className="btn btn-primary mb-2">
                    Apply Filters
                </button>
                &nbsp;
                <Link to="/employees" className="btn btn-primary mb-2" onClick={() => 
                listEmployees()}>Reset Filters</Link>
                &nbsp;
                <Link to="/add-employee" className="btn btn-primary mb-2">Add Employee</Link>
                &nbsp;
                <Link to="/positions" className="btn btn-primary mb-2">Positions</Link>
                &nbsp;
                <Link to="/contractTypes" className="btn btn-primary mb-2">Contract Types</Link>
                &nbsp;
            </div>
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
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position ? employee.position.name : 'N/A'}</td>
                            <td>{employee.contractType ? employee.contractType.name : 'N/A'}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-employee/${employee.id}`}>Update</Link>
                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={() => deleteEmployee(employee)}>Delete</button>
                                &nbsp;
                                <Link className="btn btn-info" to={`/hours-worked/${employee.id}`}>Hours worked</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ListEmployeesComponent;
