import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContractTypeService from "../services/ContractTypeService";

export const ListContractTypesComponent = () => {
    const [contractTypes, setContractTypes] = useState([]);

    useEffect(() => {
        listContractTypes();
    }, []);

    const listContractTypes = () => {
        ContractTypeService.getAllContractTypes()
            .then(response => {
                setContractTypes(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteContractType = (contractType) => {
        if (contractType && contractType.id) {
            ContractTypeService.deleteContractType(contractType.id)
                .then((response) => {
                    listContractTypes();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">ContractTypes List</h2>
            <div className="button-container">
                <Link to="/add-contractType" className="btn btn-primary mb-2">Add ContractType</Link>
                &nbsp;
                <Link to="/employees" className="btn btn-primary mb-2">Employees</Link>
                &nbsp;
                <Link to="/positions" className="btn btn-primary mb-2">Positions</Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contractTypes.map(contractType => (
                        <tr key={contractType.id}>
                            <td>{contractType.id}</td>
                            <td>{contractType.name}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-contractType/${contractType.id}`}>Update</Link>
                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={() => deleteContractType(contractType)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListContractTypesComponent;