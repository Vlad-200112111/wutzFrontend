import axios from "../axios";

const config = {
    headers: {

        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};

const endpoints = {
    // login: (data) => axios.post("Authorization/api/v1/AUser", data).catch(() => {
    //     return "ERROR"
    // }),

};

export default endpoints;