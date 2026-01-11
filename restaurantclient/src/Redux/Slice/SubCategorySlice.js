import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    category : '',
    subCategory : '',
    online : true
}]


const subCategoty = createSlice({
    name : "SubCategory",
    initialState : initialState,
    reducers : {
        addSubCategory : (state, action)=>{
            state.push({
                category : action.payload.category,
                subCategory : action.payload.subCategory,
                online : action.payload.online
            })          
        }
    }
})


export const {addSubCategory} = subCategoty.actions
export default subCategoty.reducer 