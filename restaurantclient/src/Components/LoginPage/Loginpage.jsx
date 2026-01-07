import './Loginpage.css'

export default function LoginPageComp(){
    return(
        <div className='maindiv'>

            <div className='divSplitter'>
        <div className='leftDiv'>
            <p>Menu updater tool</p>

                <div className='categoryUpdater'>
                    <div className='toolBoxCat'>

                        <div className='insideToolBox'> 
                                <p>Category Name </p>
                                <input type="text" placeholder='*eg Briyani' className='inputCat' list='categories'/>

                                <datalist id='categories'>
                                    <option value="Pizza"/>
                                    <option value="Briyani"/>
                                    <option value="Burgers"/>
                                    <option value="Fried Rice"/>
                                    <option value="Beverages"/>
                                    <option value="Wraps"/>

                                </datalist>

                                <div className='availabilityBox'>
                                <input type="checkbox" />
                                <p>Collection</p>

                                <input type="checkbox" />
                                <p>Delivery</p>
                                </div>


                        <div className='stockOptions'>
                            <button className='stockButtons'>Out of stock</button>
                            <button className='stockButtons'>In stock</button>
                        </div>  

                        <div className='finalSubmitBtn'>
                            <button className='submitHere'>Submit</button>
                        </div>

                        </div>
                    </div>


                    {/* //subcategory updater */}
                    <div className='toolBoxCat'>


                    </div>
                    <div className='toolBoxCat'>
                    

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