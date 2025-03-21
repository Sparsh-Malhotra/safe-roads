import { API_BASE_URL } from "./baseService";
import { GET_INCIDENTS, GET_INCIDENTS_BY_USER, SUBMIT_INCIDENT, USER_LOGIN } from "../constants/url-constants";
import { getAuthToken } from "@/utils/auth";

const fetchIncidents = async () => {
    const response = await fetch(`${API_BASE_URL}/${GET_INCIDENTS}`, {
        headers: {
            "Authorization": `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch incidents");
    }
    return response.json();
};

const fetchIncidentsByUser = async () => {
    const response = await fetch(`${API_BASE_URL}/${GET_INCIDENTS_BY_USER}`, {
        headers: {
            "Authorization": `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch user incidents");
    }
    return response.json();
};


const userLogin = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/${USER_LOGIN}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
            errorData?.message || `Login failed with status ${response.status}`
        );
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Login failed");
    }

    if (data.data.accessToken) {
        localStorage.setItem("auth_token", data.data.accessToken);

        localStorage.setItem("user_data", JSON.stringify(data.data.user));
    }

    return data;
};

const submitIncident = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/${SUBMIT_INCIDENT}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${getAuthToken()}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit issue');
      }
      return response.json();
}

export { fetchIncidents, userLogin,submitIncident, fetchIncidentsByUser };
