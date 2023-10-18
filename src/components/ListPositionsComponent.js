import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PositionService from "../services/PositionService";

export const ListPositionsComponent = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        listPositions();
    }, []);

    const listPositions = () => {
        PositionService.getAllPositions()
            .then(response => {
                setPositions(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deletePosition = (position) => {
        if (position && position.id) {
            PositionService.deletePosition(position.id)
                .then((response) => {
                    listPositions();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Positions List</h2>
            <div className="button-container">
                <Link to="/add-position" className="btn btn-primary mb-2">
                    Add Position
                </Link>
                &nbsp;
                <Link to="/contractTypes" className="btn btn-primary mb-2">
                    Contract Types
                </Link>
                &nbsp;
                <Link to="/employees" className="btn btn-primary mb-2">
                    Employees
                </Link>
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
                    {positions.map((position) => (
                        <tr key={position.id}>
                            <td>{position.id}</td>
                            <td>{position.name}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-position/${position.id}`}>
                                    Update
                                </Link>
                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={() => deletePosition(position)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPositionsComponent;