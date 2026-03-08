import { useContext } from "react";
import { AddonConext } from "../../../Context/ContextHook";
import { AiOutlineClose } from "react-icons/ai";
import './AddOnLinkItem.css'
import { linkAddonToItem } from "../../LoginPage/LoginFunctions";


export default function AddonLinkItem({setAddonPage}){

    const {addOnComp,showAllAddons} = useContext(AddonConext)
    function closeAddOnTab(){
        setAddonPage(false)
    }


    async function linkTheseAddon(addon, item){

        const sendAddonID = await linkAddonToItem(addon, item)
        if(sendAddonID){
            console.log(sendAddonID)
        }
    }   

    console.log(showAllAddons, 'show all addons')

    return(
        <div className='mainBGAddon'>
            <div className='interBGAddon'>
                <AiOutlineClose  onClick={closeAddOnTab}/>

                <div className="itemHeading">
                <h1 className="itemHeadingH">{addOnComp}</h1>

                    <p className="bgCol">Choose your add on to link</p>
                    <h3 className="bgCol">Click any addon at bottom to link it with the item</h3>


                </div>

                <div className="selectAddonDiv">

            {showAllAddons?.map((heads, index)=>{
                return(
                    <div key={index} className="boxerInside">
                        <h4>{heads.addOnTitile}</h4>
                        <button className="btnHere" onClick={()=>linkTheseAddon(heads._id,addOnComp)}>Link</button>
                    </div>
                )
            })}


                </div>

            </div>
        </div>
    )
}