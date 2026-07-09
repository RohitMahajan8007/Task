import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Auth/Auth.slice.js";
import TaskReducer from "../Task/Task.slice.js";


export const store = configureStore({
   reducer :{
      Auth : AuthReducer,
        task : TaskReducer
      
   }
})