import './Viewaddon.css'
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from 'react';


export default function Addonpage({setShowAddonPage,fetchedAddon,showAddonPage}){

    console.log(fetchedAddon, 'fetched addon from view addon')




    return(
        <div className="viewaddonpop">
            <div className='insideCenter'>
            <div className="insidePopup"> 
                    <AiOutlineClose onClick={()=>setShowAddonPage((prev)=>! prev)} size={30}/>

                    <div className='titleView'>
                        <div className='titlehere'>
                        <h4>Addon Title - </h4>
                        <h3>{fetchedAddon.addOnTitile}</h3>
                        </div>

                        <div className='headingView'>
                         <h4>Addon Heading - </h4>
                         <div>
                        {fetchedAddon.addOnDetails?.map((addon, index)=>{
                            return(
                                <>
                                    <h3>{addon.addOnHeading}</h3>
                                </>
                            )
                        })}
                        </div>
                        </div>


                        <div className='addOnsRow'>
                            <h4>Addons - </h4>
                            <div>
                            {fetchedAddon.addOnDetails?.map((addon, index)=> {return addon.addOns})
                            .map((elem, index)=>{ return elem.map((ads, index)=>{
                                return(
                                    <div className='addOnsRow'>
                                        <h3 className='fixedWidth'>{ads.addOnName}</h3>
                                        <h3>-</h3>
                                        <h3>{ads.addOnPrice}</h3>
                                    </div>
                                )
                            })})}
                            </div>
                        </div>
                    </div>


            </div>
            
            </div>
        
        </div>
    )
}