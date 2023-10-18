import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PositionService from "../services/PositionService";

export const AddPositionComponent = () => {
    const navigate = useNavigate();
    const [position, setPosition] = useState({
        name: ""
    });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            PositionService.getPositionById(id)
                .then((response) => {
                    const name = response.data;
                    setPosition({
                        name: name,
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [id]);

    const savePosition = (e) => {
        e.preventDefault();
        const newPosition = {
            name: position.name,
        };

        if (id) {
            // Actualizar position existente
            PositionService.updatePosition(id, newPosition)
                .then((response) => {
                    console.log(response.data);
                    navigate("/positions");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // Crear nueva position
            PositionService.createPosition(newPosition)
                .then((response) => {
                    console.log(response.data);
                    navigate("/positions");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const title = id ? "Update Position" : "Position Registration";

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">{title}</h2>
                        <div className="card-body">
                            <form onSubmit={savePosition}>
                                <div className="form-group mb-2">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        name="namePosition"
                                        className="form-control"
                                        value={position.name}
                                        onChange={(e) => setPosition({ ...position, name: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/positions" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPositionComponent;