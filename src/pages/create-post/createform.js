import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc,collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

export const CreateForm=()=>{

    const [user]=useAuthState(auth);
    const navigate = useNavigate();
    
    const schema=yup.object().shape({
        title:yup.string().required("Must Add Title"),
        description:yup.string().required("Must add Description"),

    })

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const postRef=collection(db,"posts");

    const onCreatePost=async (data)=>{
        await addDoc(postRef,{
            ...data,
            // title:data.title,
            // description:data.description,
            username:user?.displayName,
            id:user?.uid,
        })
        navigate("/");
    }


    return <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder='Title..' {...register("title")}/>
        <p style={{color:"red"}}> {errors.title?.message}</p>
        <textarea placeholder='Description..' {...register("description")}/>
        <p style={{color:"red"}}> {errors.description?.message}</p>
        <input type="submit" className="submitForm" />
      </form>
    </div>
}