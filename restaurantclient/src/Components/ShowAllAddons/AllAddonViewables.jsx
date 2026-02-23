import { AiOutlineClose } from "react-icons/ai";
import {useState, useContext} from 'react'
import './ShowaddonsMid.css'
import { AddonConext } from '../../Context/ContextHook'

export default function AllAddonViewables(){

    const {showAllAddons, setShowAddonScreen} = useContext(AddonConext)

    function toClose(){
        setShowAddonScreen((prev)=> !prev)
    }

    console.log(showAllAddons, 'state for addons')
    return(
        <div className='setMidScreen'>  

            <div style={{backgroundColor : "rgba(255,255,255,0.2("}}>
                <AiOutlineClose size={30} onClick={toClose}/>
            </div>


            <div className="showAddonsHere">
                <div>
            {showAllAddons?.map((addOn, index)=>{
                return(
                    <div key={index}>
                        <h3>{addOn.addOnTitile}</h3>
                    </div>  
                )
            })} 
            </div>
            <p>Headings : </p>
            <div>
            {showAllAddons[0]?.addOnDetails.map((heads, index)=>{
                return(
                    <p key={index}>{heads.addOnHeading}</p>
                )
            })}
            </div>
            
            </div>

            
        </div>
    )
}