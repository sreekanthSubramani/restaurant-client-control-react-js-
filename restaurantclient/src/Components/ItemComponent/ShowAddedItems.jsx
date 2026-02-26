import { AddonConext } from "../../Context/ContextHook";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLink } from "react-icons/ai";
import { showItemshereApi } from "../LoginPage/LoginFunctions";
import AddonLinkItem from './AddOnLinktoItem/AddOnLinkItem'
import './itemsPage.css'
 

export default function ShowItemsAdded(){
    const {setShowItems} = useContext(AddonConext)
    const [showItemsHere, setShowItemsHere] = useState([])
    const [categoryLists, setCategoryLists] = useState([])
    const [propCat, setPropCat] = useState('')


    const {addOnComp, setAddOnComp} = useContext(AddonConext)

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

    function handleAddOnLink(name){
        setPropCat(name)
        setAddOnComp(true)
        
    }


    return(
        <div className="showAddedItems">
            {
                addOnComp ?
                <AddonLinkItem propCat={propCat}/>
                :
                null
            }
            <div className="firstCut">
            <p>Search your item</p>
            <input className="inputTagItems"/>
            </div>

            <div className="setRowDir">        
            
            {showItemsHere?.map((items, index)=>{
                return( 
                    <>
                    <div key={index} className="eachItems">
                        <p>{items.name}</p>
                        <p>{items.price}</p>
                        <AiOutlineLink  className="touchCursor" onClick={()=>handleAddOnLink(items.name)}/>
                    </div>
                    </>
                )
            })}
            </div>
        </div>
    )
}   