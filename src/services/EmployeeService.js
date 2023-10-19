import axios from "axios"

const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/api/v1/employees" 
const POSITIONS_BASE_REST_API_URL = "http://localhost:8080/api/v1/positions" 
const CONTRACT_TYPES_BASE_REST_API_URL = "http://localhost:8080/api/v1/contractTypes" 


class EmployeeService{

    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_REST_API_URL,employee)
    }

    getPositions(){
        return axios.get(POSITIONS_BASE_REST_API_URL);
    }

    getContractTypes(){
        return axios.get(CONTRACT_TYPES_BASE_REST_API_URL);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId)
    }

    updateEmployee(employeeId, employee){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId);
    }

    getEmployeesByFilters(positionId, contractTypeId) {
        return axios.get(EMPLOYEE_BASE_REST_API_URL, {
            params: {
                positionId: positionId,
                contractTypeId: contractTypeId
            }
        });
    }
}

export default new EmployeeService();