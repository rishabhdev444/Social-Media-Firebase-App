import {getDocs, collection} from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useEffect, useState } from 'react';
import { Post } from './post';
export const Main=()=>{
    const postRef=collection(db,"posts");

    const [postList,setPostList]=useState(null)

    const getPosts=async()=>{
        const data=await getDocs(postRef)
        setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }

    useEffect(()=>{
        getPosts();
    },[])
    return <div>{postList?.map((post)=><Post post={post}/>)}</div>
}