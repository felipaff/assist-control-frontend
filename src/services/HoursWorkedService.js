import axios from "axios";

const HOURS_WORKED_BASE_REST_API_URL = "http://localhost:8080/api/v1/hours-worked";
const HOURS_WORKED_BASE_REST_API_URL_PARAM = "http://localhost:8080/api/v1/hours-worked?employeeId=";

class HoursWorkedService {
  getHoursWorkedByEmployeeId(employeeId) {
    return axios.get(`${HOURS_WORKED_BASE_REST_API_URL}/${employeeId}`);
  }

  createHoursWorked(hoursWorked, employeeId) {
    return axios.post(`${HOURS_WORKED_BASE_REST_API_URL_PARAM}${employeeId}`, hoursWorked);
  }

}

export default new HoursWorkedService();
