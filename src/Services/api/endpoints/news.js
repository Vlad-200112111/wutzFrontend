import axios from "../axios";

const config = {
    headers: {

        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};

const endpoints = {
    addNews: (data) => axios.post("news/create/", data).catch(() => {
            return "ERROR"
        }
    ),
    getNews: () => axios.get("news/"),
    getNewsByLimit: (limit) => axios.get("news/limit/",
        {
            params: {
                limit: limit
            }
        }
    ),
    deleteNews: (id) => axios.delete(`news/${id}`),
};

export default endpoints;