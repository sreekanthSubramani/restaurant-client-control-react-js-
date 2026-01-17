import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    categoryName : '',
    subCategoryName : '',
    itemName : '',
    itemPrice : ''
}]


const addItemSlice = createSlice({
    name : "Item Slice",
    initialState : initialState,
    reducers : {
        addItem : (state, action)=>{
            state.push({
                categoryNameItem : action.payload.categoryNameItem,
                subCatItSelected : action.payload.subCatItSelected,
                itemNameBlock : action.payload.itemNameBlock,
                itemPriceBlock : action.payload.itemPriceBlock
            })
        }
    }
})


export const {addItem} = addItemSlice.actions 
export default addItemSlice.reducer