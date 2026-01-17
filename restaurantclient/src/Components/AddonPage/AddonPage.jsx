import {useSelector, useDispatch} from 'react-redux'
import { fullSetAddOn,addAddons,addNewHeadingGroup } from '../../Redux/Slice/AddonSlice';
import { useState } from 'react'
import { AiFillLock } from "react-icons/ai";
import { AiFillUnlock } from "react-icons/ai";
import './Addonpage.css'


//adding addons alone with headings - to find the right heading and adding addons

export default function Addonpage(){
    
    const [addOnTitle, setAddOnTitle] = useState('')
    const [addOnHeading, setAddOnHeading] = useState('')
    const [addOnName, setAddOnName] = useState('')
    const [addOnPrice, setAddOnPrice] = useState('')
    const [lockTitle, setLockTitle] = useState(false)
    const [lockHeading, setLockHeading] = useState(false)

    
    function lockTitleTitle(){
        setLockTitle((prev)=> !prev)
    }

    function lockHeadingName(){
        setLockHeading((prev)=> !prev)
    }

    const addOnSelector = useSelector((state)=> state.addOnSlice)
    
    const dispatchWholeSet = useDispatch()
    const addOnsDispatch = useDispatch()
    const addHeadingGroup = useDispatch()

        function handleAddOnGroup(){
                
                const addOnDetails = [{
                    addOnHeading : addOnHeading,
                    addOns : [{
                        addOnName : addOnName,
                        addOnPrice : addOnPrice
                    }]
                }]
                dispatchWholeSet(fullSetAddOn({
                    addOnTitle : addOnTitle,
                    addOnDetails : addOnDetails
                }))
        }

        console.log(addOnSelector, 'add on slice')

        function handleAddOnsAlone(){
                const getTitle = addOnSelector.addOnDetails[0].addOnHeading
                if(getTitle === addOnHeading){
                   addOnsDispatch(
                    addAddons([{
                        addOnName : addOnName,
                        addOnPrice : addOnPrice
                    }]))
                }else{
                    console.log('no you did not lock the heading')
                }
        }   
        
        function handleNewHeadings(){

            const addOnDetails = {
                addOnHeading : addOnHeading,
                addOns : [{
                    addOnName : addOnName,
                    addOnPrice : addOnPrice
                }]
            }

            addHeadingGroup(addNewHeadingGroup({
                addOnDetails : addOnDetails
            }))
        }
    
    return(
        <>
        <div className='belowHeaderAddon'>  
            {/* full space */}

            <div className='insideBelowHeaderAddon'>
                        {/* inside space */}

                <div className='adddOnFirst'>
                    
                    <p>Addon Title: </p>
                    <div className='addOnTitleRow'>
                    <input 
                    type="text"
                    className='inputAddon'
                    onChange={(e)=> setAddOnTitle(e.target.value)}
                    value={addOnTitle}
                    disabled={lockTitle}
                    />
                    <div>
                    {lockTitle ?  <AiFillLock onClick={lockTitleTitle} size={40}/> : <AiFillUnlock onClick={lockTitleTitle} size={40}/>}
                    </div>

                    </div>
                    
                    <p>Addon Heading: </p>
                    <div className='addOnTitleRow'>
                    <input 
                    type="text"
                    className='inputAddon'
                    onChange={(e)=> setAddOnHeading(e.target.value)}
                    value={addOnHeading}
                    disabled={lockHeading}
                    />
                    <div>
                       {lockHeading ?  <AiFillLock onClick={lockHeadingName} size={40}/> : <AiFillUnlock onClick={lockHeadingName} size={40}/>}
                    </div>
                </div>
                </div>

                <div className='adddOnSecond'>
                        {/* addon item space */}
                        <p>Addon Name: </p>
                        <input 
                        type="text"
                        className='inputAddon'
                        onChange={(e)=> setAddOnName(e.target.value)}
                        value={addOnName}
                        />
                          <p>Addon Price : </p>
                        <input 
                        type="text"
                        className='inputAddon'
                        onChange={(e)=> setAddOnPrice(e.target.value)}
                        value={addOnPrice}
                        />
                </div>

                 <div className='adddOnThird'>
                    {/* addon heading space */}


                        
                </div>

            </div>            

            <div className='submitBtn'>
            <button onClick={handleAddOnGroup}>Submit</button>
            <button onClick={handleAddOnsAlone}>Submit Addons Alone</button>
             <button onClick={handleNewHeadings}>Submit Addons Headings</button>
            </div>
        </div>
        </>
    )
}