import { useContext } from "react";
import { AddonConext } from "../../../Context/ContextHook";
import { AiOutlineClose } from "react-icons/ai";
import './AddOnLinkItem.css'

export default function AddonLinkItem({propCat}){

    const {setAddOnComp} = useContext(AddonConext)
    function closeAddOnTab(){
        setAddOnComp(false)
    }

    console.log(propCat, 'prop cat')

    return(
        <div className='mainBGAddon'>
            <div className='interBGAddon'>
                <AiOutlineClose  onClick={closeAddOnTab}/>

                <div className="itemHeading">
                <h1 className="itemHeadingH">{propCat}</h1>

                    <p>Choose your add on to link</p>

                </div>

            </div>
        </div>
    )
}