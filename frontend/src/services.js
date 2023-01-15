import http from "./http-common";

const getAllItems = key => {
    return http.get('/')
}

const functions = {
    getAllItems,
};
export default functions