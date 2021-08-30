import {
    CLEAR_CREATE_SCHEDULE_ERROR,
    CREATE_SCHEDULE,
    CREATE_SCHEDULE_ERROR, DELETE_SCHEDULE,
    GET_CATEGORIES,
    GET_SCHEDULE_BY_CATEGORY
} from "../actions/type";

const init_state = {
    schedules:[],
    categories:[],
    reload:false,
    error_message:"",
}
const scheduleReducer = (state=init_state,action)=>{
    switch (action.type){
        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload,
            }
        case GET_SCHEDULE_BY_CATEGORY:
            return{
                ...state,
                schedules: action.payload,
                reload: false,
            }
        case CREATE_SCHEDULE:
            return {
                ...state,
                reload:true,
            }
        case CREATE_SCHEDULE_ERROR:
            return{
                ...state,
                error_message:action.payload
            }
        case CLEAR_CREATE_SCHEDULE_ERROR:
            return {
                ...state,
                error_message: ""
            }
        case DELETE_SCHEDULE:
            return {
                ...state,
                reload: true
            }
        default:
            return state
    }
}

export default scheduleReducer;