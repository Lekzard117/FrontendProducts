import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
    throw new Error('Failed Connection');
}
const createHeaders = (token = "NONE") => {
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    };
    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }
    return headers;
};

const login = async (data, token = "NONE") => {
    const headers = createHeaders(token)
    const response = await axios.post(`${apiUrl}/sesion`, data, { headers });
    return response.data;
};

const listPerson = async (token = "NONE") => {
    const headers = createHeaders(token);
    try {
        const response = await axios.get(`${apiUrl}/person/account`, { headers });
        return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/404'; 
        }
    }
};
const api ={
    login,

    listPerson
}
export default api