import { userReduser } from "./userRedusers"
import {  combineReducers } from "redux"

const rootReduser = combineReducers({
    user : userReduser,
})

export default rootReduser