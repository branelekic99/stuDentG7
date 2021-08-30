import {combineReducers} from "redux";
import authReducer from "./auth";
import newsReducer from "./news";
import scheduleReducer from "./schedule";
import appointmentsReducer from "./appointments";
import galleryReducer from "./gallery";

const allReducers = combineReducers({
    auth:authReducer,
    news:newsReducer,
    schedule:scheduleReducer,
    appointments:appointmentsReducer,
    gallery:galleryReducer
});

export  default allReducers;
