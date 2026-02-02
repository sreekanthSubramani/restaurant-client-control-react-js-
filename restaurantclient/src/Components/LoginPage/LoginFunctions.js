import { axiosApi } from "../../../axios.config"

export const addCatogoryDB = async (categoryName, collection, delivery, inStock)=>{

    try{
        const postTheCat = await axiosApi.post('/addCategory', {
            categoryName, 
            collection, 
            delivery, 
            inStock
        })

        const resp = postTheCat.data
        console.log(resp)

    }catch(e){
        console.log(e)
    }

}