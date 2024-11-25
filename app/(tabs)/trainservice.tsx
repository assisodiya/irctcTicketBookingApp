import axios from "axios";

const BASE_URL = 'http://192.168.56.1:3002'
export const GetStationListService = async (searchString: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/stationlist`, {
            params: { searchString },
            withCredentials: true
        });
        return response.data;
    } catch (error) {       
        throw error;
    }
}
export const GetTrainListService = async (fromStation:string | string[], toStation:string | string[], date:string | string[]) => {
    try {
        const response = await axios.get(`${BASE_URL}/trainbetweenstation/${fromStation}/${toStation}/${date}/cache`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {       
        throw error;
    }
}