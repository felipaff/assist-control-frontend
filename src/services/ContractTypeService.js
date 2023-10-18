import axios from "axios"

const CONTRACT_TYPES_BASE_REST_API_URL = "http://localhost:8080/api/v1/contractTypes" 

class ContractTypeService {

    getAllContractTypes(){
        return axios.get(CONTRACT_TYPES_BASE_REST_API_URL);
    }

    createContractType(contractType){
        return axios.post(CONTRACT_TYPES_BASE_REST_API_URL,contractType)
    }

    getContractTypeById(contractTypeId){
        return axios.get(CONTRACT_TYPES_BASE_REST_API_URL + "/" + contractTypeId)
    }

    updateContractType(contractTypeId, contractType){
        return axios.put(CONTRACT_TYPES_BASE_REST_API_URL + "/" + contractTypeId, contractType);
    }

    deleteContractType(contractTypeId){
        return axios.delete(CONTRACT_TYPES_BASE_REST_API_URL + "/" + contractTypeId);
    }
};

export default new ContractTypeService();