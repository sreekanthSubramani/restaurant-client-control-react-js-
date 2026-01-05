import './Entry.css'


export default function EntryPage(){

    const loginScreenUnsplash = 'https://images.unsplash.com/photo-1486520299386-6d106b22014b?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return(
        <div className='handleEntry'>

                <div className='leftHalfWindow'>
                    
                    <img src={loginScreenUnsplash} 
                    alt="loginScreen" 
                    style={{
                        width : "100%",
                        height : '100%'
                    }}
                    />


                </div>

                <div className='rightHalfWindow'>

                    <div className='insideRightHalfWindow'>
                        <h1>Login</h1>                    

                        <form className='formClass'>
                            <input type="text" placeholder='Enter username' className='inputForm1'/>
                            <input type="password" placeholder='Enter password' className='inputForm1'/>
                            <button className='buttonLogin'>Submit</button>
                        </form>
                    </div>

                </div>


        </div>
    )
}