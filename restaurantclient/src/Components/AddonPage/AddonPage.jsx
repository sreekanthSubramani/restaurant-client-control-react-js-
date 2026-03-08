import {useSelector, useDispatch} from 'react-redux'
import { fullSetAddOn,addAddons,addNewHeadingGroup } from '../../Redux/Slice/AddonSlice';
import { useState, useContext } from 'react'
import { AiFillLock } from "react-icons/ai";
import { AiFillUnlock } from "react-icons/ai";
import ShowAddonsView from './ShowAddonsView/ShowAddons';
import { AiOutlineLink } from "react-icons/ai"; 
import { AiOutlineDoubleRight,AiOutlineCloud } from "react-icons/ai";
import './Addonpage.css'


//loginFunctions

import { AddonGroupAdder, findAllAddons } from '../LoginPage/LoginFunctions';
import {AddonHeadingAdder} from '../LoginPage/LoginFunctions'
import { AddonAdder } from '../LoginPage/LoginFunctions';
import { AddonConext } from '../../Context/ContextHook';

import {useNavigate} from 'react-router-dom'




    //Show the Addons selected and work on linkage

export default function Addonpage(){
    
    const [addOnTitle, setAddOnTitle] = useState('')
    const [addOnHeading, setAddOnHeading] = useState('')
    const [addOnName, setAddOnName] = useState('')
    const [addOnPrice, setAddOnPrice] = useState('')
    const [lockTitle, setLockTitle] = useState(false)
    const [lockHeading, setLockHeading] = useState(false)
    const [showAddons, setShowAddons] = useState(false)

    //name for submit button

    const [starter, setStarter] = useState(true)
    const {  setShowAllAddons,setShowItems, showItems } = useContext(AddonConext)

    
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

       async function handleAddOnGroup(){
            setLockTitle(true)
            setLockHeading(true)
                setStarter(false)
                setShowAddons(true)
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



                await AddonGroupAdder(addOnTitle, addOnHeading, addOnName, addOnPrice)
        }

        
        async function handleAddOnsAlone(){

            addOnsDispatch(addAddons({
                addOnHeading : addOnHeading,
                addOnName : addOnName,
                addOnPrice : addOnPrice

            }))

            await AddonAdder(addOnTitle, addOnHeading, addOnName, addOnPrice)
               
        }   

        
        async function handleNewHeadings(){

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

            await AddonHeadingAdder(addOnTitle, addOnHeading, addOnName, addOnPrice)
        }

        function clearAll(){
            setAddOnTitle('')
            setAddOnHeading('')
            setAddOnName('')
            setAddOnPrice('')
        }


        const addOnsHere = useSelector((state)=> state.addOnSlice)

        const navigate = useNavigate()

        

        async function showAllAddonsFunc(){

            const allAddons = await findAllAddons()
            setShowAllAddons(allAddons.msg)
            navigate('/items')
        }

        function showItemsHere(){   
            navigate('/addon')
        }

        console.log(showItems, 'show items here')

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
            <div className='submitBtn'>
                {starter&& addOnTitle&& addOnHeading&& addOnName&& addOnPrice&&  <button onClick={handleAddOnGroup}>Submit</button>}
                {!starter && lockHeading && lockTitle &&
                <>
                <button onClick={handleAddOnsAlone}>Submit Addons Alone</button>
                </>
                }
                {!starter && !lockHeading && lockTitle &&
                <>
                <button onClick={handleNewHeadings}>Submit Addons Headings</button>
                </>
                }

                <button onClick={clearAll}>Clear All</button>
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
                    {showAddons ? 
                    <>
                    <p className='addOnTitle'>Title : {addOnsHere.addOnTitle}</p>
                    <div className='setRowWise'>
                    <div className='showAddonsTable'>
                    <ShowAddonsView />
                    </div>
                    <div className='necessaryLogos'> 
                    <AiOutlineCloud size={30} onClick={showAllAddonsFunc}/>
                    </div>
                    </div>
                    </>
                    :
                    <>
                    <div className='showAddonsTable'>
                        <div className='withoutAddons'>
                        <p>Your Addons will appear here</p>
                        <h4>Enter details and click Submit</h4>
                        </div>
                    </div>
                    <div className='necessaryLogos'> 
                    <AiOutlineLink size={30} onClick={showItemsHere}/> 
                    <AiOutlineCloud size={30} onClick={showAllAddonsFunc}/>
                    </div>
                    </>
                    }                       
                </div>
            </div>    



                <div className='quickNoteDiv'>
                    <div className='twobytwo'>
                        <div className='insidetwoDiv'>
                <div className='insideSetDetail'>
                <p>(to add detail)</p>
                <p><AiOutlineDoubleRight /> Fill all fields</p>
                <p><AiOutlineDoubleRight /> Submit button will appear</p>
                </div>

                <div className='insideSetDetail'>
                <p>(to continue new heading)</p>
                <p><AiOutlineDoubleRight /> Lock the Title</p>
                <p><AiOutlineDoubleRight /> Unlock the Headings</p>
                </div>
                    </div>

                    <div className='insidetwoDiv'>
                         <div className='insideSetDetail'>
                <p>(to continue adding addons)</p>
                <p><AiOutlineDoubleRight /> Lock the Title</p>
                <p><AiOutlineDoubleRight /> Lock the Headings</p>
                </div>

                <div className='insideSetDetail'>
                <p><AiOutlineDoubleRight /> click on the link symbol with item </p>
                <p><AiOutlineDoubleRight /> check</p>
                </div>




                    </div>
                    </div>
            </div>          

        </div>
        </>
    )
}