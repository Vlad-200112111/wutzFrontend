import axios from "../axios";

const config = {
    headers: {

        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};

const endpoints = {
    login: (data) => axios.post("jwt/create/", data).catch(() => {
        return "ERROR"
    }),
    list: (data) => axios.post('jwt/verify/', data).catch(() => {
    return "ERROR"
}),

};

export default endpoints;