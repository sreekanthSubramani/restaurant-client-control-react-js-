import { configureStore } from "@reduxjs/toolkit";
import categorySlice from './Slice/CategorySlice'

export const store = configureStore({
    reducer : {
        category : categorySlice
    }
})
