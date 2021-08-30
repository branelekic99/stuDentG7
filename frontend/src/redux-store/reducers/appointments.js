import {CANCEL_RESERVATION, GET_APPOINTMENTS, GET_RESERVED_APPOINTMENTS, MAKE_RESERVATION} from "../actions/type";

const init_state = {
    appointmentsArray:[],
    reload:false,
}
const appointmentsReducer = (state=init_state,action)=>{
    switch (action.type){
        case GET_APPOINTMENTS:
            return{
                ...state,
                appointmentsArray:action.payload,
                reload: false,
            }
        case GET_RESERVED_APPOINTMENTS:
            return {
                ...state,
                appointmentsArray: action.payload,
                reload: false,
            }
        case MAKE_RESERVATION:
            return {
                ...state,
                reload: true
            }
        case CANCEL_RESERVATION:
            return {
                ...state,
                reload: true
            }
        default:
            return state
    }
}

export default appointmentsReducer;