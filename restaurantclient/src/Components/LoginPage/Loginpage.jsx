import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Loginpage.css'
import { addCategory } from '../../Redux/Slice/CategorySlice'
import { addSubCategory } from '../../Redux/Slice/SubCategorySlice'
import { addItem } from '../../Redux/Slice/Itemslice'

import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Addonpage from '../AddonPage/AddonPage'


export default function LoginPageComp(){

    const [categories, setCategories] = useState([])
    const categoryDispatch = useDispatch()
    const subCategoryDispatch = useDispatch()
    const itemDispatch = useDispatch()

    const selectedCats = useSelector((state)=> state.category)
    const selectedSubCats = useSelector((state)=> state.subCategory)
    const itemAdded = useSelector((state)=> state.addItem)

    //menu items here
    const [menuCats, setMenuCats]= useState(
        {
            categoryName : '',
            collection : false,
            delivery : false,
            outofStock : false,
        }
    )

    const [categoryName, setCategoryName] = useState('')
    const [collection, setCollection] = useState(false)
    const [delivery, setDelivery] = useState(false)
    const [outofStock, setOutOfStock] = useState(true)

    const [inStock, setInStock] = useState(false)

    const [subCatOnline, setSubCatOnline] = useState(true)

    //for updating the sub category for the opted category
    const[selectedCat, onSetSelectedCat] = useState('')
    const [subCategory, setSubCategory] = useState('')

    //for updating item

    const [categoryNameItem, setCategoryNameItem] = useState('')
    const [subCatItSelected, setSubCatItSelected] = useState('')
    const [itemNameBlock , setItemNameBlock] = useState('')
    const [itemPriceBlock, setItemPriceBlock] = useState('')



    function handleInitialCategory(){
        setMenuCats({
            categoryName : categoryName,
            collection : collection,
            delivery : delivery,
            stockIn : outofStock,
        })


        categoryDispatch(
            addCategory({
            categoryName : categoryName,
            collection : collection,
            delivery : delivery,
            outofStock : outofStock
        })
    )
        setCategoryName('')
        setCollection(false)
        setDelivery(false)
    }


function handleStocks(){
    setInStock((prev)=> !prev)
    setOutOfStock((prev)=> !prev)
}

function handleSubCatOnline(){
    setSubCatOnline((prev)=> !prev)
}


function handleImgUpload(){
    
}

function handleSubCatData(){
    subCategoryDispatch(
            addSubCategory({
            category : selectedCat,
            subCategory : subCategory,
            online : subCatOnline
        })
)

    setSubCategory('')
}


function handleItemUpdater(){
    

    itemDispatch(
        addItem({
        categoryNameItem : categoryNameItem,
        subCatItSelected : subCatItSelected,
        itemNameBlock : itemNameBlock,
        itemPriceBlock : String(itemPriceBlock)
    }))
}


    return(
        <div className='maindiv'>

        <div className='divSplitter'>
        <div className='leftDiv'>
            
            <div className='fullLeftDiv'>
                
                {/* heading */}
                <div className='headingMenuUpdater'>
                <h1>Menu Updater :</h1>
                </div>


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
                                    <option value={cats} key={index}/>
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
                        <input type="file" accept='image/*' onChange={handleImgUpload} />
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

                                <input 
                                className='inputCat' 
                                list='catList1'
                                onChange={(e)=> onSetSelectedCat(e.target.value)}
                                value={selectedCat}
                                />
                               
                                <datalist id='catList1'>
                                    {selectedCats.slice(1).map((elem, index)=>{
                                        return(
                                            <option key={index} value={elem.categoryName} />
                                        )
                                    })}
                                </datalist>
                                
                                <input 
                                type='text'
                                className='inputCat'
                                onChange={(e)=> setSubCategory(e.target.value)}
                                value={subCategory}
                                />
                                
                                <div className='stockOptions'>
                                <div className={subCatOnline ? 'outOfStockClass' : 'hoverTheStock'} onClick={handleSubCatOnline}>
                                        {subCatOnline
                                            ? 
                                            <h4 style={{backgroundColor : "green"}}>In Stock</h4>
                                            :
                                            <h4>Out of Stock</h4>
                                            }
                                </div>
                                </div>
                                
                                <div className='finalSubmitBtn'>
                                    {selectedCat
                                    ?
                                    <button className='submitHere' onClick={handleSubCatData}>Submit Subcategory</button>
                                    :
                                    <h4>Please select category to add your Subcategory</h4>
                                    }
                                </div>
                            </div>

                            
                    </div>



                    {/* item updater */}


                    <div className='toolBoxCat'>
                            <div className='insideToolBox'>
                                <p>Item Updater : </p>
                                
                                <div className='catsAndSubs'>
                                <div className='catsFlexRow'>
                                    <p>Category</p>
                                    <input 
                                    type="text" 
                                    className='inputTypeCat'
                                    list='allCats'
                                    onChange={(e)=> setCategoryNameItem(e.target.value)}
                                    value={categoryNameItem}
                                    />

                                    <datalist id='allCats'>
                                        {selectedSubCats.slice(1).map((cat, index)=>{
                                            return(
                                                <option value={cat.category} key={index} />
                                            )
                                        })}  
                                    </datalist>
                                
                                </div>

                                <div className='catsFlexRow'>
                                    <p>Subcategory</p>
                                    <input 
                                    type="text" 
                                    className='inputTypeCat'
                                    list='subCatsSelection'
                                    value={subCatItSelected}
                                    onChange={(e)=> setSubCatItSelected(e.target.value)}
                                    />

                                    <datalist id='subCatsSelection'>
                                        {selectedSubCats.filter(subCats=> subCats.category == categoryNameItem).map((elem, index)=>{
                                            return(
                                                <option value={elem.subCategory} key={index} />
                                            )
                                        })}

                                    </datalist>


                                </div>
                                </div>

                                <div className='insideItemUpdater'>
                                
                                <div>
                                <p>Item Name : </p>
                                <input 
                                type="text"  
                                className='inputBoxItemUpdater'
                                onChange={(e)=> setItemNameBlock(e.target.value)}
                                value={itemNameBlock}
                                />
                                </div>
                                
                                <div className='insideItemUpdater'>
                                <p>Item Price : </p>
                                <input 
                                type="number"  
                                className='inputBoxItemUpdaterPrice'
                                onChange={(e)=>setItemPriceBlock(String(e.target.value))}
                                value={itemPriceBlock}
                                />

                                </div>
                                
                                </div>
                                <div className='insideItemUpdater'>
                                        <div className='addItemBtn' onClick={handleItemUpdater}>
                                            Add Item 
                                        </div>
                                </div>


                            </div>
                    </div>
                </div>

                <div className='addOnPageDiv'>
                    <Addonpage />           
                </div>
                </div>
            

        </div>

        <div className='rightDiv'>
            <div className='cxViewHeading'>
            <p className='cxViewHeading'>Customer View</p>
                    {selectedCats.slice(1).map((cats,index)=>{
            return(
                <div key={index} className='catsCxView'>
                    <div className='catNameHere'>
                        <h3>{cats.categoryName}</h3>
                    </div>
                    
                    
                    <div className='catsDelsStocks'>
                        {/* cols delivery stocks */}
                    <div className='microContent'> 
                        <p>Collection</p>
                        {cats.collection == true ?
                        <p style={{color : "green"}}>Open</p>
                        :
                        <p style={{color : 'red'}}>Close</p>
                        }
                    </div>

                    <div className='microContent'>
                        <p>Delivery</p>
                        {cats.delivery == true ?
                        <p style={{color : "green"}}>Open</p>
                        :
                        <p style={{color : 'red'}}>Close</p>
                        }
                    </div>
                        <div className='microContent'>
                        <p>Stock</p>
                        {cats.outofStock == true ?
                        <div>
                        <AiOutlineCheck />
                        </div>
                        :
                        <AiOutlineClose />
                        }
                        </div>

                    </div>


                </div>

            )
        })}
            </div>
        </div>

        
        </div>

        </div>
    )
}