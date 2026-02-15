import { axiosApi } from "../../../axios.config"

export const addCatogoryDB = async (categoryName, collection, delivery, inStock,secureImage)=>{

    try{
        const postTheCat = await axiosApi.post('/addCategory', {
            categoryName, 
            collection, 
            delivery, 
            inStock,
            images : secureImage || 'processing'
        })

        const resp = postTheCat.data
        console.log(resp, 'resp from cat')

    }catch(e){
        console.log(e)
    }

}



export const addSubCatDB = async (category, subCategory, online)=>{
    try{
        const createSubCat = await axiosApi.post('/add/SubCat', {
            category : category,
            subCategory : subCategory,
            online : online
        })
 
        const resp = createSubCat.data
        console.log(resp)

    }catch(e){
        console.log(e)
    }
}


export const addIteminDB = async (categoryNameItem,subCatItSelected,itemNameBlock,itemPriceBlock)=>{
    try{
        const itemUpdater = await axiosApi.post('/all/Item', {
            categoryNameItem,
            subCatItSelected,
            itemNameBlock,
            itemPriceBlock
        })

        const resp = itemUpdater.data
        console.log(resp, 'resp with item updater')

    }catch(e){  
        console.log(e)
    }
}


export const AddonGroupAdder = async (addOnTitle, addOnHeading, addOnName, addOnPrice)=>{
    try{
        const sendAddonFromHere = await axiosApi.post('/add/addons/group', {
            addOnTitle, 
            addOnHeading, 
            addOnName, 
            addOnPrice
        })

        const resp = sendAddonFromHere.data
        console.log(resp, 'response for addon')

    }catch(e){
        console.log(e)
    }
}


export const AddonHeadingAdder = async (addOnTitle, addOnHeading, addOnName, addOnPrice)=>{
    try{
        const addonHeadingAdder = await axiosApi.post('/add/addons/heading', {
            addOnTitle,
            addOnHeading, 
            addOnName, 
            addOnPrice
        })

        const resp = addonHeadingAdder.data
        console.log(resp)

    }catch(e){
        console.log(e)
    }
}


export const AddonAdder = async (addOnTitle, addOnHeading, addOnName, addOnPrice) =>{
    try{

        const addOnAdder = await axiosApi.post('/add/addons', {
            addOnTitle,
            addOnHeading,
            addOnName, 
            addOnPrice
        })

        const resp = addOnAdder.data
        console.log(resp)

    }catch(e){
        console.log(e)
    }
}


export const uploadImageFunction = async (formData)=>{
    try{
        const res = await fetch('http://localhost:4444/image/upload/cloud', {
            method : "POST",
            "Content-Type": "multipart/form-data",
            body : formData
        })

        const resp = await res.json()
        return resp

    }catch(e){
        console.log(e)
    }
}