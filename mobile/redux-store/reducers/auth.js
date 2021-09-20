import {GET_PROFILE, SIGN_IN, UPDATE_PROFILE,LOG_OUT,GUEST_MODE} from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_KEY} from "../../constants/variables";

const initState = {
    authenticated:false,
    guestMode:false,
    id:"",
    age:"",
    email:"",
    firstName:"",
    lastName:"",
    phoneNumber:"",
}
const authReducer = (state=initState,action)=>{
    switch (action.type){
        case SIGN_IN:
            const token = action.payload.accessToken;
            AsyncStorage.setItem(ASYNC_STORAGE_KEY,token);
            return {
                authenticated: true,
                id:action.payload.id,
                age:action.payload.age,
                email:action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phoneNumber: action.payload.phoneNumber
            }
        case GUEST_MODE:
            return {
                ...state,
                guestMode: true,
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                id:action.payload.id,
                age:action.payload.age,
                email:action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phoneNumber: action.payload.phoneNumber
            }
        case GET_PROFILE:
            return {
                ...state,
                id:action.payload.id,
                age:action.payload.age,
                email:action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phoneNumber: action.payload.phoneNumber
            }
        case LOG_OUT:
            AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
            return initState;
        default:
            return initState;
    }
};

export default authReducer;