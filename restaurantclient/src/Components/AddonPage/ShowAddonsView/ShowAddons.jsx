import './ShowAddons.css'
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { addOnDeleter,addOnUpdateEditor } from '../../../Redux/Slice/AddonSlice';
import { useState } from 'react';


export default function ShowAddonsView(){

    const addOnsHere = useSelector((state)=> state.addOnSlice)
    const dispatch = useDispatch()
    const [addOnEditorial , setAddOnEditorial] = useState({
      heading : "",
      index : null
    })
    const [addOnUpdater, setAddOnUpdater] = useState({
      addOnName : "",
      addOnPrice : ""
    })


    function addOnDeleterReducer(heading,index){
      dispatch(addOnDeleter({heading, index}))
    }

    function addOnEditor(heading, index){
      setAddOnEditorial({
        heading : heading,
        index : index
      })
    }

    function handleDone(addOnName, addOnPrice, heading, index){

      dispatch(addOnUpdateEditor({addOnName, addOnPrice, heading, index}))
      setAddOnEditorial({
        heading : "",
        index : null
      })





    }


  console.log(addOnUpdater, 'addon updater')

    return(
        <div className='addOnSubPage'>
            <div className='addOnSubPage2'>
  {addOnsHere.addOnDetails.map((addOnDetail, index) => {
    return (
      <div key={index} className='addOnsForLinkage'>  
        <p className='headingAddons'>{addOnDetail.addOnHeading}</p>

        {addOnDetail.addOns.map((adds, i) => {
            
            const isEditing = addOnEditorial.heading === addOnDetail.addOnHeading && addOnEditorial.index === i;

          return (
            <div key={i} className='rowsforPrices'>
              {!isEditing?  
              <>
              <p>{adds.addOnName} :</p>
              <p> {adds.addOnPrice}</p>
              </>
              :
              <>
              <input 
              placeholder='name' 
              className='haveInputs'
              onChange={(e)=> setAddOnUpdater((prev)=> ({...prev, addOnName : e.target.value}))} 
              value={addOnUpdater.addOnName}
              />
              <input 
              placeholder='price' 
              className='haveInputs'
              onChange={(e)=> setAddOnUpdater((prev)=> ({...prev, addOnPrice : e.target.value}))}
              value={addOnUpdater.addOnPrice}
              />
              </>
              }
              
              
              <div className='editAndDel'>
                  {isEditing ?
                  <div>
                    <AiOutlineCheck onClick={()=>handleDone(addOnUpdater.addOnName, addOnUpdater.addOnPrice,addOnDetail.addOnHeading, i)}/>
                  </div>
                  :
                  <>
                <AiOutlineDelete onClick={()=>addOnDeleterReducer(addOnDetail.addOnHeading, i)}/>
                <AiTwotoneEdit onClick={()=>addOnEditor(addOnDetail.addOnHeading, i)}/>
                  </>

                  }
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