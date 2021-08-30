import {
    AUTH_ERROR,
    CHANGE_PASSWORD,
    CREATE_ADMIN,
    LOG_IN,
    LOG_OUT,
    UPDATE_PASSWORD,
    UPDATE_USER_STATUS
} from "../actions/type";
import {UNAUTHORIZED, AUTHORIZED, CHECKING} from "../../constants/constants";

const init_state={
    authenticated:false,
    user:"",
    auth_error_message:"",
    auth_status: CHECKING,
    is_superuser:false,
}

const authReducer = (state = init_state,action)=>{
    switch (action.type){
        case LOG_IN:
            localStorage.setItem("stu_dent",action.payload.accessToken)
            return{
                ...state,
                authenticated: true,
                auth_status: AUTHORIZED,
                user:action.payload.username,
                is_superuser: action.payload.isSuperuser,
                auth_error_message:""
            }
        case UPDATE_USER_STATUS:
            return {
                ...state,
                authenticated: true,
                auth_status: AUTHORIZED,
                user:action.payload.username,
                is_superuser: action.payload.isSuperuser
            }
        case LOG_OUT:
            localStorage.removeItem("stu_dent");
            return{
                authenticated: false,
                user:"",
                auth_error_message:"",
                auth_status: UNAUTHORIZED,
                is_superuser:false,
            }
        case AUTH_ERROR:
            return{
                ...state,
                auth_status: UNAUTHORIZED,
                authenticated: false,
                auth_error_message: action.payload
            }
        case CREATE_ADMIN:
            return{
                ...state,
            }
        case CHANGE_PASSWORD:
            localStorage.removeItem("stu_dent");
            return {
                authenticated: false,
                user:"",
                auth_error_message:"",
                auth_status: UNAUTHORIZED,
                is_superuser:false,
            }
        default:
            return state;
    }
};
export  default authReducer;