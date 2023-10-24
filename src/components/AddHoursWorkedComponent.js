import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HoursWorkedService from "../services/HoursWorkedService";

export const AddHoursWorkedComponent = () => {
  const navigate = useNavigate();
  const [hoursWorked, setHoursWorked] = useState({
    dateWorked: "",
    hours: 0,
    extraHours: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    setHoursWorked((prevHoursWorked) => ({ ...prevHoursWorked, employeeId: id }));
  }, [id]);

  const saveHoursWorked = (e) => {
    e.preventDefault();

    if (
      !hoursWorked.dateWorked ||
      isNaN(hoursWorked.hours) ||
      isNaN(hoursWorked.extraHours) ||
      hoursWorked.hours < 0
    ) {
      alert("Fields can't be empty and hours must be a positive value.");
      return;
    }

    const newHoursWorked = {
      dateWorked: hoursWorked.dateWorked,
      hours: parseFloat(hoursWorked.hours),
      extraHours: parseFloat(hoursWorked.extraHours),
    };

    HoursWorkedService.createHoursWorked(newHoursWorked, id)
      .then((response) => {
        console.log(response.data);
        navigate(`/hours-worked/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const title = "Hours Worked Registration";

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">{title}</h2>
            <div className="card-body">
              <form onSubmit={saveHoursWorked}>
                <div className="form-group mb-2">
                  <label className="form-label">Date Worked</label>
                  <input
                    type="date"
                    name="dateWorked"
                    className="form-control"
                    value={hoursWorked.dateWorked}
                    onChange={(e) =>
                      setHoursWorked({ ...hoursWorked, dateWorked: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Hours</label>
                  <input
                    type="number"
                    step="0.1"
                    name="hours"
                    className="form-control"
                    value={hoursWorked.hours}
                    onChange={(e) =>
                      setHoursWorked({ ...hoursWorked, hours: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Extra Hours</label>
                  <input
                    type="number"
                    step="0.1"
                    name="extraHours"
                    className="form-control"
                    value={hoursWorked.extraHours}
                    onChange={(e) =>
                      setHoursWorked({ ...hoursWorked, extraHours: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                &nbsp;&nbsp;
                <Link to={`/hours-worked/${id}`} className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
