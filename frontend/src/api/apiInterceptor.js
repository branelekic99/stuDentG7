import api from "./api";

const LOCAL_STORAGE_KEY = "stu_dent";


const interceptor = store =>{
    api.interceptors.request.use(config=>{
        const token = localStorage.getItem(LOCAL_STORAGE_KEY);
        config.headers['x-access-token'] = token;
        return config;
    });
    api.interceptors.response.use(response => {
        return response;
    }, error => {

        // if (error.response && error.response.status === HttpResponseStatus.UNAUTHORIZED) {
        //   store.dispatch(handleUserNotAuthorized());
        // }

        return Promise.reject(error);
    });
};

export default {interceptor}