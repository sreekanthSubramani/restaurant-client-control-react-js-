import { configureStore } from "@reduxjs/toolkit";
import categorySlice from './Slice/CategorySlice'
import subCategorySlice from './Slice/SubCategorySlice'

export const store = configureStore({
    reducer : {
        category : categorySlice,
        subCategory : subCategorySlice
    }
})
