import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContractTypeService from "../services/ContractTypeService";

export const AddContractTypeComponent = () => {
    const navigate = useNavigate();
    const [contractType, setContractType] = useState({
        name: ""
    });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            ContractTypeService.getContractTypeById(id)
                .then((response) => {
                    const name = response.data;
                    setContractType({
                        name: name,
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [id]);

    const saveContractType = (e) => {
        e.preventDefault();
        const newContractType = {
            name: contractType.name,
        };

        if (id) {
            // Actualizar contractType existente
            ContractTypeService.updateContractType(id, newContractType)
                .then((response) => {
                    console.log(response.data);
                    navigate("/contractTypes");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // Crear nuevo contractType
            ContractTypeService.createContractType(newContractType)
                .then((response) => {
                    console.log(response.data);
                    navigate("/contractTypes");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const title = id ? "Update ContractType" : "ContractType Registration";

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">{title}</h2>
                        <div className="card-body">
                            <form onSubmit={saveContractType}>
                                <div className="form-group mb-2">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        name="nameContractType"
                                        className="form-control"
                                        value={contractType.name}
                                        onChange={(e) => setContractType({ ...contractType, name: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/contractTypes" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContractTypeComponent;