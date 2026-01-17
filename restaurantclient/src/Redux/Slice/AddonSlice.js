import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addOnTitle : '',
    addOnDetails : [ ]   
}

const sliceForAddon = createSlice({
    name : "addon slice",
    initialState : initialState,
    reducers : {
        fullSetAddOn : (state,action)=>{
            state.addOnTitle = action.payload.addOnTitle
            state.addOnDetails.push(...action.payload.addOnDetails)
        },
        addAddons : (state, action)=>{
             state.addOnDetails[0].addOns.push({
                addOnName : action.payload.addOnName,
                addOnPrice : action.payload.addOnPrice
             })
        },
        addNewHeadingGroup : (state, action)=>{
            state.addOnDetails.push({...action.payload.addOnDetails})
        }

    }
})


export const {fullSetAddOn,addAddons,addNewHeadingGroup} = sliceForAddon.actions
export default sliceForAddon.reducer