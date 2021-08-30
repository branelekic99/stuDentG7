import {ADD_NEWS, CLEAR_SELECTED_ITEM, DELETE_NEWS, GET_NEWS, GET_NEWS_BY_ID,UPDATE_NEWS} from "../actions/type";

const init_state={
    news_list:[],
    offset:0,
    reload:false,
    edit_object:null,
    count:0,
}

const newsReducer = (state = init_state,action)=>{
    switch (action.type){
        case ADD_NEWS:
            return{
                ...state,
                reload:true,
            }
        case UPDATE_NEWS:
            return{
                ...state,
                reload: true
            }
        case GET_NEWS:
            return {
                ...state,
                news_list: action.payload.rows,
                offset:action.payload.offset,
                count:action.payload.count,
                reload: false
            }
        case GET_NEWS_BY_ID:
            return{
                ...state,
                edit_object:action.payload
            }
        case CLEAR_SELECTED_ITEM:
            return {
                ...state,
                edit_object: null,
            }
        case DELETE_NEWS:
            return{
                ...state,
                reload:true
            }
        default:
            return state;
    }
};
export  default newsReducer;