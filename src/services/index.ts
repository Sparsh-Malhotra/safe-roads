import { API_BASE_URL } from "./baseService";
import { GET_INCIDENTS } from "../constants/url-constants";

const fetchIncidents = async () => {
    const response = await fetch(`${API_BASE_URL}/${GET_INCIDENTS}`);
    if (!response.ok) {
        throw new Error("Failed to fetch incidents");
    }
    return response.json();
};

export { fetchIncidents };
