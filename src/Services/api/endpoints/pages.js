import axios from "../axios";

const endpoints = {
    addCategoryForPage: (data) => axios.post("category-for-page/create/", data).catch(() => {
            return "ERROR"
        }
    ),
    updateCategoryForPage: (id, data) => axios.put(`category-for-page/${id}`, data),
    deleteCategoryForPage: (id) => axios.delete(`category-for-page/${id}`),
    getCategoryForPage: () => axios.get("category-for-page/"),
    getCategoriesAndPages: () => axios.get("categories-and-pages/"),
    addPage: (data) => axios.post("page/create/", data).catch(() => {
            return "ERROR"
        }
    ),
    updatePage: (id, data) => axios.put(`page/${id}`, data),
    getPages: () => axios.get("page/"),
    getPage: (id) => axios.get(`page/${id}`),
    deletePage: (id) => axios.delete(`page/${id}`),
};

export default endpoints;