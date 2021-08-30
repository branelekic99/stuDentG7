import {ADD_IMAGE, DELETE_IMAGE, GET_GALLERY} from "../actions/type";

const initState = {
    images:[],
    reload:false,
}
const galleryReducer = (state=initState,action)=>{
    switch (action.type){
        case GET_GALLERY:
            return {
                ...state,
                images: action.payload,
                reload: false,
            }
        case ADD_IMAGE:
            return {
                ...state,
                reload:true,
            }
        case DELETE_IMAGE:
            return {
                ...state,
                reload: true
            }
        default:
            return initState;
    }
}

export default galleryReducer;