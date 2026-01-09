import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Loginpage.css'
import { addCategory } from '../../Redux/Slice/CategorySlice'


export default function LoginPageComp(){

    const [categories, setCategories] = useState([])
    const categoryDispatch = useDispatch(addCategory())
    const selectedCats = useSelector((state)=> state.category)
    
    //menu items here
    const [menuCats, setMenuCats]= useState([
        {
            categoryName : '',
            collection : false,
            delivery : false,
            outofStock : false,
            inStock : true,
        }
    ])

    const [categoryName, setCategoryName] = useState('')
    const [collection, setCollection] = useState(false)
    const [delivery, setDelivery] = useState(false)
    const [outofStock, setOutOfStock] = useState(true)

    const [inStock, setInStock] = useState(false)

    function handleInitialCategory(){
        setMenuCats(((prev)=> [...prev, {
            categoryName : categoryName,
            collection : collection,
            delivery : delivery,
            stockIn : outofStock,
        }]))

        if(menuCats.length > 0){
            reduxAddCats(menuCats)
        }
    }

    function reduxAddCats(arrayOfCats){
        categoryDispatch(arrayOfCats)
    }

    console.log(selectedCats, 'selected cats')

function handleStocks(){
    setInStock((prev)=> !prev)
    setOutOfStock((prev)=> !prev)
}

    return(
        <div className='maindiv'>

            <div className='divSplitter'>
        <div className='leftDiv'>
            <p>Menu updater tool</p>

                <div className='categoryUpdater'>
                    <div className='toolBoxCat'>

                        <div className='insideToolBox'> 
                                <p> Add Category Name : </p>
                                <input 
                                type="text" 
                                placeholder='*eg Pizza' 
                                className='inputCat' 
                                list='categories'
                                onChange={(e)=> setCategoryName(e.target.value)}
                                value={categoryName}
                                />

                                <datalist id='categories'>
                                {categories.map((cats, index)=>{
                                    return(
                                    <option value={cats}/>
                                )
                                })}
                                </datalist>
  

                                <div className='availabilityBox'>
                                <input 
                                type="checkbox"
                                onChange={()=> setCollection((prev)=> !prev)}
                                value={collection}
                                checked={collection ? true : false}
                                />
                                <p>Collection</p>

                                <input 
                                type="checkbox"
                                onChange={()=> setDelivery((prev)=> !prev)}
                                value={delivery}
                                checked={delivery ? true : false}
                                />
                                <p>Delivery</p>
                                </div>


                        <div className='stockOptions'>

                            <div className={inStock ? 'hoverTheStock': 'outOfStockClass'} onClick={handleStocks}>
                                    {inStock
                                        ? 
                                        <h4>Out of Stock</h4>
                                        :
                                        <h4 style={{backgroundColor : "green"}}>In Stock</h4>}
                            </div>
                            </div>  
                        
                        <div className='imgUpload'>
                        <p>Upload category picture</p>
                        <input type="file" />
                        </div>


                        <div className='finalSubmitBtn'>
                            <button className='submitHere' onClick={handleInitialCategory}>Submit</button>
                        </div>

                        </div>
                    </div>


                    {/* //subcategory updater */}
                    <div className='toolBoxCat'>
                           <div className='insideToolBox'>
                                <p>Subcategory Updater : </p>
                                
                            </div>
                    </div>



                    {/* item updater */}


                    <div className='toolBoxCat'>

                            <div className='insideToolBox'>

                            </div>
                    

                    </div>
                </div>
        </div>

        <div className='rightDiv'>
            <div >
            <p style={{backgroundColor : "white", color : "black"}}>Customer View</p>
            </div>
        </div>
        
        </div>

        </div>
    )
}