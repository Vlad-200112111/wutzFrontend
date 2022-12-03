import axios from "../axios";


const endpoints = {
    updateMainInfo: (data) => axios.put("main-info/1", data).catch(() => {
        return "ERROR"
    }),
    getMainInfo: () => axios.get("main-info/1"),
};

export default endpoints;