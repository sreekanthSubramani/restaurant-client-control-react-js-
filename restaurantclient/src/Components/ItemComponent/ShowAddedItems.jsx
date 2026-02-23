import { AddonConext } from "../../Context/ContextHook";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLink } from "react-icons/ai";
import { showItemshereApi } from "../LoginPage/LoginFunctions";
import './itemsPage.css'
 

export default function ShowItemsAdded(){
    const {setShowItems} = useContext(AddonConext)
    const [showItemsHere, setShowItemsHere] = useState([])

    function handleClosure(){
        setShowItems((prev)=>!prev)
    }


useEffect(() => {
    const fetchData = async () => {
        try {
            const { msg } = await showItemshereApi()
            setShowItemsHere(msg)
        } catch (error) {
            console.error(error)
        }
    }

    fetchData()
}, [])

    console.log(showItemsHere, 'show items here')

    return(
        <div className="showAddedItems">
            <AiOutlineClose size={30} onClick={handleClosure}/>

            {showItemsHere?.map((items, index)=>{
                return(
                    <div key={index} className="eachItems">
                        <p>{items.name}</p>
                        <p>{items.price}</p>
                        <AiOutlineLink  className="touchCursor"/>
                    </div>
                )
            })}
        </div>
    )
}   