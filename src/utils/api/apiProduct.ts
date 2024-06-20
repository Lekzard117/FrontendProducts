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

const saveProduct = async (data, token = "NONE") => {
    const headers = createHeaders(token);
    const response = await axios.post(`${apiUrl}/product/save`, data, { headers });
    console.log(response);
    return response.data;
};

const modifyProduct = async(data, token = "NONE") => {
    const headers = createHeaders(token);
    const response = await axios.post(`${apiUrl}/modify/product`, data, { headers });
    console.log(response);
    return response.data;
}

const listProduct = async () => {
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    };
    const response = await axios.get(`${apiUrl}/product`, { headers });
    console.log(response.data);

    return Array.isArray(response.data.data) ? response.data.data : [];
};

const deleteProduct = async (data, token = "NONE") => {
    const headers = createHeaders(token)
    const response = await axios.post(`${apiUrl}/delete/product`,data, { headers });
    console.log(response);
    return response.data;
}

const api = {
    listProduct,
    saveProduct,
    modifyProduct,
    deleteProduct
}
export default api