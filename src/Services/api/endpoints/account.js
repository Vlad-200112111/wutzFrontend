import axios from "../axios";

const config = {
    headers: {

        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};

const endpoints = {
    login: (data) => axios.post("token/create/", data).catch(() => {
        return "ERROR"
    }),
    checkAuthorization: (data) => axios.post("token/verify/",
        {
            token: data
        }
    ),
    logout: () => axios.post("logout/", {refresh: localStorage.getItem('refresh-token')}),
    getProfileList: () => axios.get('profile/').catch(() => {
        return "ERROR"
    }),
    getProfileById: (id) => axios.get(`profile/`,
        {
            params: {
                id: id
            }
        }
    )

};

export default endpoints;