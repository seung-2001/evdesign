import axios from "axios";
const apiUrl = window.ENV?.API_URL || "http://127.0.0.1:8081";


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

export const assignOperator = async(url, authToken, member) =>{
   const res =  await axios.put(
          `${apiUrl}${url}${member.memberNo}`,
          { 
            newRole: 'ROLE_OPERATOR',
            currentRole: member.roleStatus,
            status: member.status
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
    return res;
}

export const deleteMemByAd = async(member, url, authToken) => {
    const res = await axios.delete(`${apiUrl}${url}${member.memberNo}`, {
          headers: { Authorization: `Bearer ${authToken}` },
    });

}

export const responseStatus = async( res, errMessage, setMembers) => {
    const { message, data, success } = res.data;
    if (success === "요청성공") {
      const members = Array.isArray(data) ? data : [];
      setMembers(members);
    } else {
      alert(message || `${errMessage}`);
      setMembers([]);
    }
}