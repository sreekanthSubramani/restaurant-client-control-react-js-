import './ShowAddons.css'
import { useSelector } from "react-redux"
import { AiOutlineLink } from "react-icons/ai";



export default function ShowAddonsView(){

    const addOnsHere = useSelector((state)=> state.addOnSlice)

    console.log(addOnsHere, 'addons here')

    return(
        <div className='addOnSubPage'>
            <div className='addOnSubPage2'>
  {addOnsHere.addOnDetails.map((addOnDetail, index) => {
    return (
      <div key={index} className='addOnsForLinkage'>
        <p className='headingAddons'>{addOnDetail.addOnHeading}</p>

        {addOnDetail.addOns.map((adds, i) => {
          return (
            <div key={i} className='rowsforPrices'>
              <p>{adds.addOnName} :</p>
              <p> {adds.addOnPrice}</p>
            </div>
          )
        })}

      </div>
          )
  })}
            </div>


        </div>
    )

}