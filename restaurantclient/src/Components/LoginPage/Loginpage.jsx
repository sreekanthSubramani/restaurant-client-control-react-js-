import { useState, useRef, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Loginpage.css'
import { addCategory } from '../../Redux/Slice/CategorySlice'
import { addSubCategory } from '../../Redux/Slice/SubCategorySlice'
import { addItem } from '../../Redux/Slice/Itemslice'
import { AiFillLock } from "react-icons/ai";
import { AiFillUnlock } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Addonpage from '../AddonPage/AddonPage'
import { addCatogoryDB,sendCategories,addSubCatDB,addIteminDB,uploadImageFunction,sendSubCategories } from './LoginFunctions'
import AllAddonViewables from '../ShowAllAddons/AllAddonViewables';
import ShowItemsAdded from '../ItemComponent/ShowAddedItems'
import { AddonConext } from '../../Context/ContextHook'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function LoginPageComp(){

    const [categories, setCategories] = useState([])
    const categoryDispatch = useDispatch()
    const subCategoryDispatch = useDispatch()
    const itemDispatch = useDispatch()

    const selectedCats = useSelector((state)=> state.category)
    const selectedSubCats = useSelector((state)=> state.subCategory)
    const itemAdded = useSelector((state)=> state.addItem)
    const {  showAddOnScreen, showItems  } = useContext(AddonConext)

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
    const [secureImage, setSecureImage] = useState('')
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [showSingleCats, setShowSingleCats] = useState([])


    //ref for updating image

    const imageRef = useRef(null)
    const queryClient = useQueryClient()

            const mutation = useMutation({
            mutationFn : sendCategories,
            onSuccess : ()=>{
                queryClient.invalidateQueries({queryKey : ['category']})
            }
        })


    async function handleInitialCategory(){

        
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
            outofStock : outofStock,
        })
    )
        await addCatogoryDB(categoryName, collection, delivery, inStock,secureImage)
    
        setCategoryName('')
        setCollection(false)
        setDelivery(false)        
        setSecureImage('')

        if(imageRef.current){
            imageRef.current.value = ""
        }

     
        mutation.mutate({
            categoryName, 
            collection, 
            delivery, 
            inStock,
            secureImage
        })


    }


// main cat with image upload


        const handleImgUpload = async (e)=>{

        const file = e.target.files?.[0]

        const formData = new FormData()
        formData.append('picture', file)
        
        setLoadingStatus(true)
        const uploadImgCloud =  await uploadImageFunction(formData)
        try{
            let imageCloud = await uploadImgCloud
            setSecureImage(imageCloud?.msg?.secure_url)
            setLoadingStatus(false)
        
        }catch(e){
            console.log(e, 'error')
        }

    }




function handleStocks(){
    setInStock((prev)=> !prev)
    setOutOfStock((prev)=> !prev)
}

function handleSubCatOnline(){
    setSubCatOnline((prev)=> !prev)
}



  
async function handleSubCatData(){

    
    subCategoryDispatch(
            addSubCategory({
            category : selectedCat,
            subCategory : subCategory,
            online : subCatOnline
        })
)

    let category = selectedCat
    let online = subCatOnline


    await addSubCatDB(category,subCategory,online)
    setSubCategory('')
    onSetSelectedCat('')

}

const [foritemLock, setForItemLock] = useState(false)


async function handleItemUpdater(){

    itemDispatch(
        addItem({
        categoryNameItem : categoryNameItem,
        subCatItSelected : subCatItSelected,
        itemNameBlock : itemNameBlock,
        itemPriceBlock : String(itemPriceBlock)
    }))

    await addIteminDB(categoryNameItem, subCatItSelected, itemNameBlock, itemPriceBlock) 
}



function lockerCatandSubCat(){
    setForItemLock((prev)=> !prev)
}



function showSinglesCats(){
    let filterOutCat = selectedSubCats.slice(1).map((cats)=>cats.category)
    let settingOutOnlyCats = new Set([...filterOutCat])    
    const makeArray = Array.from(settingOutOnlyCats)
    setShowSingleCats(makeArray)
}


useEffect(()=>{
    showSinglesCats()
},[selectedSubCats])


//tanstack query here

const categoryCacheQuery = useQuery({
    queryKey : ['category'],
    queryFn : sendCategories
})

const subCategoryCacheQuery = useQuery({
    queryKey : ['subcats'],
    queryFn : sendSubCategories
})

console.log(subCategoryCacheQuery.data, 'sub cat cache')



const [showSubCatDB, setShowSubCatDB] = useState([])


useEffect(()=>{

        const scatCache = subCategoryCacheQuery.data

        if(scatCache){
        const filterOnlyRelatedSubCats =  scatCache.filter(subs => subs?.category.categoryName === categoryNameItem)
        if(filterOnlyRelatedSubCats){
            console.log('into if block')
            let filterSubs = filterOnlyRelatedSubCats.map(sub=>{return sub.subCategory})
            setShowSubCatDB(filterSubs)
        }else{

            console.log('went to else block')
            const filterOnlyRelatedSubCats =  scatCache.filter(subs => subs?.category.categoryName === categoryNameItem)
            let filterSubs = filterOnlyRelatedSubCats.map(sub=>{return sub.subCategory})
            setShowSubCatDB(filterSubs)


        }}},[categoryNameItem])


// console.log(showSubCatDB, ' show ')


    return(
        <div className='maindiv'>
                              {showAddOnScreen && 
                <div >
                    <AllAddonViewables />
                </div>
                }

                {
                    showItems &&
                    <div>
                        <ShowItemsAdded />
                    </div>
                    
                }

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
                                disabled = {foritemLock}
                                />

                                <datalist id='categories'>
                                {!categoryCacheQuery.data 
                                ? 
                                categories.map((cats, index)=>{
                                    return(
                                    <option value={cats} key={index}/>
                                )
                                })
                            
                                :
                                categoryCacheQuery.data.map((cats, index)=>{
                                    return(
                                        <option value={cats.categoryName} key={index} />
                                    )
                                })
                                }
                                </datalist>
  

                                <div className='availabilityBox'>
                                <input 
                                type="checkbox"
                                onChange={()=> setCollection((prev)=> !prev)}
                                value={collection}
                                checked={collection ? true : false}
                                disabled = {foritemLock}
                                />
                                <p>Collection</p>

                                <input 
                                type="checkbox"
                                onChange={()=> setDelivery((prev)=> !prev)}
                                value={delivery}
                                checked={delivery ? true : false}
                                disabled = {foritemLock}
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
                        <input
                        ref={imageRef}
                        name="picture" 
                        type="file" 
                        accept='image/*' 
                        onChange={handleImgUpload} />
                        </div>

                        {loadingStatus && <p>Loading...</p>}
                        
                        {!secureImage  ?
                        <div>
                            <p>Submit button will appear once the image is uploaded</p>
                        </div>

                        :

                        <div className='finalSubmitBtn'>
                            <button className='submitHere' onClick={handleInitialCategory}>Submit</button>
                        </div> }
                        

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
                                disabled = {foritemLock}
                                />
                               
                                <datalist id='catList1'>
                                    {!categoryCacheQuery.data
                                    ?
                                    selectedCats.slice(1).map((elem, index)=>{
                                        return(
                                            <option key={index} value={elem.categoryName} />
                                        )
                                    })
                                :
                                
                                    categoryCacheQuery.data.map((cats, index)=>{
                                    return(
                                        <option value={cats.categoryName} key={index} />
                                    )
                                })
                                }
                                </datalist>
                                
                                <input 
                                type='text'
                                className='inputCat'
                                onChange={(e)=> setSubCategory(e.target.value)}
                                value={subCategory}
                                disabled = {foritemLock}
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

                       {foritemLock ? 
                        <AiFillLock size={30} onClick={lockerCatandSubCat} /> 
                        : 
                        <AiFillUnlock size={30} onClick={lockerCatandSubCat}/>
                        } 



                        

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
                                    {!categoryCacheQuery.data
                                    ?
                                       
                                        [...showSingleCats].map((cat)=>{
                                            return(
                                                <option value={cat}  />
                                            )
                                        })
                                    :

                                     categoryCacheQuery.data.map((cats, index)=>{
                                    return(
                                        <option value={cats.categoryName} key={index} />
                                    )
                                })
                                    
                                    }  
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
                                        {!subCategoryCacheQuery.data
                                        ?
                                        selectedSubCats.filter(subCats=> subCats.category == categoryNameItem).map((elem, index)=>{
                                            return(
                                                <option value={elem.subCategory} key={index} />
                                            )
                                        })
                                    :
                                        showSubCatDB.map((allItems,index)=>{return(
                                            <option value={allItems} key={index} />
                                        )})
                                    }

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
                                    {itemNameBlock && itemPriceBlock  ?
                                        <div className='addItemBtn' onClick={handleItemUpdater}>
                                            Add Item 
                                        </div> 
                                        :
                                        <div>
                                            <p>Add Item and Price to submit</p>
                                        </div>
                                        }
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
                    { !categoryCacheQuery.data
                    ?
                    selectedCats.slice(1).map((cats,index)=>{
                    return(
                <div key={index} className='catsCxView'>
                    <div className='catNameHere'>

                        <div>
                        <h3>{cats.categoryName}</h3>
                        </div>

                        <div className='subCatNos'>
                            {selectedSubCats.filter((allSubCats)=> allSubCats.category == cats.categoryName).length}
                        </div>

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
        })
        
        :
        
        categoryCacheQuery.data.map((cats, index)=>{
            return(
                <div key={index} className='catsCxView'>
                    <div className='catNameHere'>

                        <div>
                        <h3>{cats.categoryName}</h3>
                        </div>
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
                        {cats.stockIn === false ?
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
        })
        
        }
            </div>
        </div>

        
        </div>

        </div>
    )
}