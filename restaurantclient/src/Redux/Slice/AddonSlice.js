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
            let setAddons = state.addOnDetails.find(addOnElems=>
                addOnElems.addOnHeading == action.payload.addOnHeading
            )


            setAddons.addOns.push({
                addOnName : action.payload.addOnName,
                addOnPrice : action.payload.addOnPrice
            })
        },

        addNewHeadingGroup : (state, action)=>{
            state.addOnDetails.push({...action.payload.addOnDetails})
        },
        addOnDeleter: (state, action) => {  
            const { heading, index } = action.payload;

            state.addOnDetails = state.addOnDetails.map((group) => {
            if (group.addOnHeading === heading) {
            return {
            ...group,
            addOns: group.addOns.filter((_, i) => i !== index),
            };
            }
            return group;
            });
            },
        addOnUpdateEditor : (state, action)=>{
            const {addOnName, addOnPrice,heading, index} = action.payload
            state.addOnDetails = state.addOnDetails.map((group)=>{
                if(group.addOnHeading === heading){
                    group.addOns[index] = {
                        addOnName : addOnName,
                        addOnPrice : addOnPrice
                    }   
                }
                return group
            })
        }


}
})


export const {fullSetAddOn,addAddons,addNewHeadingGroup,addOnDeleter,addOnUpdateEditor} = sliceForAddon.actions
export default sliceForAddon.reducer