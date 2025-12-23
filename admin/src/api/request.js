import axios from "axios";
const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

export const reqObj = {
    getList : (url) =>
        axiosxios.get(`${API}${url}`).then(res => res.data.data),
    
}

export const allMember = async (url, authToken) => {
    const res = await axios.get(`${apiUrl}${url}`, {
        headers: { Authorization: `${authToken}` },
      });
      return res;
}