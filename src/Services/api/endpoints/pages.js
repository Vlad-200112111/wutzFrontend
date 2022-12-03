import axios from "../axios";

const endpoints = {
    addCategoryForPage: (data) => axios.post("category-for-page/create/", data).catch(() => {
            return "ERROR"
        }
    ),
    updateCategoryForPage: (id, data) => axios.put(`category-for-page/${id}`, data),
    deleteCategoryForPage: (id) => axios.delete(`category-for-page/${id}`),
    getCategoryForPage: () => axios.get("category-for-page/"),
    addPage: (data) => axios.post("page/create/", data).catch(() => {
            return "ERROR"
        }
    ),
    getPages: () => axios.get("page/"),
};

export default endpoints;