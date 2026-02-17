import './ShowAddons.css'
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { addOnDeleter } from '../../../Redux/Slice/AddonSlice';


export default function ShowAddonsView(){

    const addOnsHere = useSelector((state)=> state.addOnSlice)
    const dispatch = useDispatch()



    function ullaVaangu(heading,index){
      console.log(heading, index)
      dispatch(addOnDeleter({heading, index}))
    }



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
              
              <div className='editAndDel'>
                <AiOutlineDelete onClick={()=>ullaVaangu(addOnDetail.addOnHeading, i)}/>
                <AiTwotoneEdit />
              </div>
            
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