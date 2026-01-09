import {createSlice} from '@reduxjs/toolkit'


const initiatlState =  [{
        categoryName : "",
        collection : false,
        delivery : false,
        inStock : true
    }]


const categorySlice = createSlice({
    name : "Category",
    initialState : initiatlState,
    reducers : {
        addCategory : (state, action)=>{
            state.push({
                categoryName : action.payload.categoryName,
                collection : action.payload.collection,
                delivery : action.payload.delivery,
                outofStock : action.payload.outofStock

            })
        }
    }
})


export const {addCategory} = categorySlice.actions
export default categorySlice.reducer
