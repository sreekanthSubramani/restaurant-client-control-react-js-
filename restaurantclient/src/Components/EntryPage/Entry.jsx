import './Entry.css'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { useState } from 'react'
import { axiosApi } from '../../../axios.config'
import { toast } from 'react-toastify'

export default function EntryPage(){

    const loginScreenUnsplash = 'https://images.unsplash.com/photo-1486520299386-6d106b22014b?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    //ui control box
    const [signUp, setSignUp] = useState(false)


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [deal, setDeal] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleCred(e){
        e.preventDefault()
        
        try{
            setLoading(true)
            const postReqForEmail = await axiosApi.post('/new/signup', {
            username : username,
            email : email,
            deal : deal
            })

            if(postReqForEmail?.data.msg){
                toast.error(`${postReqForEmail?.data.msg}`)
            }   

            setLoading(false)
            return toast.success('Please check your email for further information !')
            
        }catch(e){
            setLoading(false)
            toast.error(e?.response.data.msg)
        }



    }

    function handleSignUp(){
        setSignUp(true)
    }

    function navToSignin(){
        setSignUp(false)
    }

    function handleSelect(e){
        console.log(e)
    }


    const [clientEmail, setClientEmail] = useState('')
    const [password, setPassword] = useState('')

    async function signInCred(e){
        e.preventDefault()
        const signInVar = await axiosApi.post('/login/client', {
            username : clientEmail,
            password : password
        })
        
        console.log(signInVar?.data, 'check')
    }


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
                        

                        {!signUp ? 
                        <>
                        <h1>Login</h1>                    

                        <form className='formClass'>
                            <input 
                            type="text" 
                            placeholder='Enter username' 
                            onChange={(e)=> setClientEmail(e.target.value)}
                            value={clientEmail}
                            className='inputForm1'/>

                            <input 
                            type="password" 
                            placeholder='Enter password' 
                            onChange={(e)=> setPassword(e.target.value)}
                            value={password}
                            className='inputForm1'/>

                            <button 
                            className='buttonLogin'
                            onClick={signInCred}>
                                
                                Submit
                                
                            </button>
                        </form>
                        
                            <div className='backtoSignUp'>
                            <AiOutlineArrowRight size={20} className='leftA' onClick={handleSignUp}/>
                            <h3>Sign up</h3>
                            </div>
                        </>
                        :
                        <>
                        
                        <h1>Sign up</h1>                    

                        <form className='formClass'>
                            <input 
                            type="text" 
                            placeholder='Enter Name' 
                            onChange={(e)=> setUsername(e.target.value)}
                            className='inputForm1'/>

                            <input 
                            type="Enter Email" 
                            placeholder='Enter Email' 
                            onChange={(e)=> setEmail(e.target.value)}
                            className='inputForm1'/>

                            <select
                            value={deal}
                            onChange={(e)=> setDeal(e.target.value)}
                            className='buttonLogin'
                            >
                            <option> -- Choose your deal --</option>
                            <option value="Basic Deal">Basic Deal</option>
                            <option name="Saver Deal">Saver Deal</option>
                            <option name="Hero Deal" id="">Hero Deal</option>
                            </select>

                            {loading ? 
                                <p>Loading...</p>
                                :
                            <button 
                            className='buttonLogin'
                            onClick={handleCred}>
                                
                                Submit
                                
                            </button>

                            }

                            
                            <div className='backtoSignin'>
                            <AiOutlineArrowLeft size={20} className='leftA' onClick={navToSignin}/>
                            <h3>Back to sign in</h3>
                            </div>

                        </form>
                            

                        </>}
                    </div>

                </div>

        </div>
    )
}