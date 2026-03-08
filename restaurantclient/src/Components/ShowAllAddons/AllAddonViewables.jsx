import { AiFillEye , AiFillEyeInvisible } from "react-icons/ai";
import {useState, useContext, useEffect} from 'react'
import './ShowaddonsMid.css'
import { AddonConext } from '../../Context/ContextHook'
import { showFullAddon } from "../LoginPage/LoginFunctions";
import Addonpage from "../Addon/ViewAddon";


export default function AllAddonViewables(){

    const {showAllAddons} = useContext(AddonConext)
    const [showAddonPage, setShowAddonPage] = useState(false)
    const [showAddonContent, setShowAddonContent] = useState({
        addOnName : '',
        index : null
    })
    const [fetchedAddon, setFetchedAddon] = useState([])


    async function showAddonsClicked(adTitle, index){
        setShowAddonPage((prev)=> !prev)
        setShowAddonContent({
            addOnName : adTitle,
            index : index
        })
        
        const throwFullAddon = await showFullAddon(adTitle)
        if(throwFullAddon){
            setFetchedAddon(throwFullAddon)
        }
    }




    return(
        <div className='setMidScreen'>  

        {showAddonPage ?

            <div className="showAddonRel">
            <Addonpage setShowAddonPage={setShowAddonPage} fetchedAddon={fetchedAddon} showAddonPage={showAddonPage}/>
            </div>

            :
            
            null
        }

            <div style={{backgroundColor : "rgba(255,255,255,0.2("}}>
            </div>


            <div>
            {showAllAddons?.map((addOn, index)=>{
                const isEditing = showAddonContent.addOnName == addOn.addOnTitile && showAddonContent.index == index
                return(
                    <div key={index} className="showAddonsHere">

                        <div className="titleGaps">
                        <h3>{addOn.addOnTitile}</h3>
                        </div>

                        <div className="titleGaps">
                            {isEditing ?
                            <AiFillEye  onClick={()=>showAddonsClicked(addOn.addOnTitile, index)} size={30} />
                            :
                            <AiFillEyeInvisible onClick={()=>showAddonsClicked(addOn.addOnTitile, index)} size={30}/>                            
                        }
                                
                                
                        </div>

                    </div>  
                )
            })} 
            </div>

            
        </div>
    )
}