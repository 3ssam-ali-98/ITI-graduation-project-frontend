import { combineReducers } from "redux";
import { loggeduser } from "./loggeduserreducer";


export default combineReducers({

    user : loggeduser

})