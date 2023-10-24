import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HoursWorkedService from "../services/HoursWorkedService";

export const ListHoursWorkedComponent = () => {
  const [hoursWorked, setHoursWorked] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    listHoursWorked(id);
  }, [id]);

  const listHoursWorked = (id) => {
    HoursWorkedService.getHoursWorkedByEmployeeId(id)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setHoursWorked(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHoursWorked = (id) => {
    HoursWorkedService.deleteHoursWorked(id)
      .then(() => {
        listHoursWorked(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Hours Worked List</h2>
      <div className="button-container">
        <Link to="/add-hoursWorked" className="btn btn-primary mb-2">
          Add Hours Worked
        </Link>
        &nbsp;
        <Link to="/contract-types" className="btn btn-primary mb-2">
          Contract Types
        </Link>
        &nbsp;
        <Link to="/employees" className="btn btn-primary mb-2">
          Employees
        </Link>
        &nbsp;
        <Link className="btn btn-info mb-2" to={`/add-hoursWorked/${id}`}>
          Hours Worked
        </Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Date Worked</th>
            <th>Hours</th>
            <th>Extra Hours</th>
          </tr>
        </thead>
        <tbody>
          {hoursWorked.map((hours) => (
            <tr key={hours.id}>
              <td>{hours.id}</td>
              <td>{hours.employee}</td>
              <td>{hours.dateWorked}</td>
              <td>{hours.hours}</td>
              <td>{hours.extraHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
