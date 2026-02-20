import { AiOutlineClose } from "react-icons/ai";
import {useState, useContext} from 'react'
import './ShowaddonsMid.css'
import { AddonConext } from '../../Context/ContextHook'

export default function AllAddonViewables(){

    const {setShowAddonScreen} = useContext(AddonConext)

    function toClose(){
        setShowAddonScreen((prev)=> !prev)
    }
    return(
        <div className='setMidScreen'>  

            <div style={{backgroundColor : "rgba(255,255,255,0.2("}}>
                <AiOutlineClose size={30} onClick={toClose}/>

            </div>
            
        </div>
    )
}