import {auth,provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export const Login=()=>{
    const navigate=useNavigate();

    const signInWithgoogle=async ()=>{
        const result=await signInWithPopup(auth,provider);
        navigate('/');
    }


    return <div>
        <p>Sign In with Google</p>
        <button onClick={signInWithgoogle}>Sign In with Google</button>
    </div>
}