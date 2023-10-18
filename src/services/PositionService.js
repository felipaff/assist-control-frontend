import axios from "axios"

const POSITIONS_BASE_REST_API_URL = "http://localhost:8080/api/v1/positions"

class PositionService{

    getAllPositions(){
        return axios.get(POSITIONS_BASE_REST_API_URL);
    }

    createPosition(position){
        return axios.post(POSITIONS_BASE_REST_API_URL,position)
    }

    getPositionById(positionId){
        return axios.get(POSITIONS_BASE_REST_API_URL + "/" + positionId)
    }

    updatePosition(positionId, position){
        return axios.put(POSITIONS_BASE_REST_API_URL + "/" + positionId, position);
    }

    deletePosition(positionId){
        return axios.delete(POSITIONS_BASE_REST_API_URL + "/" + positionId);
    }
}

export default new PositionService();