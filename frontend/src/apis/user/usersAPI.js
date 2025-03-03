import axios from "axios";
//Regestration 


//============Regestration AP========
export const registerAPI = async (userData) => {

    const response = await axios.post("http://localhost:8090/api/v1/users/register", {
        email: userData?.email,
        password: userData?.password,
        username: userData?.username
    },
        {
            withCredentials: true,
        }
    );
    return response?.data;
}
//============Login AP========
export const loginAPI = async (userData) => {

    const response = await axios.post("http://localhost:8090/api/v1/users/login", {
        email: userData?.email,
        password: userData?.password,
    },
        {
            withCredentials: true,
        }
    );
    return response?.data;
}

//============Check AUTH AP========
export const checkUserAuthStatusAPI = async () => {

    const response = await axios.get
        ("http://localhost:8090/api/v1/users/auth/check",
            {
                withCredentials: true,
            }
        );
    return response?.data;
}
//============Logout AP========
export const logoutAPI = async () => {

    const response = await axios.post
        ("http://localhost:8090/api/v1/users/logout", {},
            {
                withCredentials: true,
            }
        );
    return response?.data;
}
//============getUserProfile AP========
export const getUserProfileAPI = async () => {

    const response = await axios.get
        ("http://localhost:8090/api/v1/users/profile",
            {
                withCredentials: true,
            }
        );
    return response?.data;
}

//============deleteHistory AP========
export const deleteHistoryAPI = async (id) => {
    console.log(id);
    const response = await axios.delete
        ("http://localhost:8090/api/v1/users/deletehistory/" + id,
            {
                withCredentials: true,
            }
        );
    return response?.data;
}

//============updateUserContent AP========
export const updateUserContentAPI = async (content) => {
    console.log(content);
    const response = await axios.put(
        `http://localhost:8090/api/v1/users/updatecontent/${content._id}`,
        content,
        {
            withCredentials: true,
        }
    );
    return response?.data;
};
