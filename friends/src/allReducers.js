import { CombinedReducers, combineReducers } from "redux";
import { friendsReducer } from "./friendsReducer";

const reducers = combineReducers({ friendsReducer });
export default reducers;
