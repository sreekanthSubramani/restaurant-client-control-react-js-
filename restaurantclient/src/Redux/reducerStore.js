import { configureStore } from "@reduxjs/toolkit";
import categorySlice from './Slice/CategorySlice'
import subCategorySlice from './Slice/SubCategorySlice'
import addItemSlice from './Slice/Itemslice'
import addOnSlice from './Slice/AddonSlice'

export const store = configureStore({
    reducer : {
        category : categorySlice,
        subCategory : subCategorySlice,
        addItem : addItemSlice,
        addOnSlice : addOnSlice
    }
})
