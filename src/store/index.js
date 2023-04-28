import { configureStore } from "@reduxjs/toolkit";
import books from './BookSlice'
import auth from "./authSlice"
import reportSlice from "./reportSlice";

export default configureStore({
    reducer: {books,auth,reportSlice}
})