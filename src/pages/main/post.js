import { addDoc, collection,query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../../App.css';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
export const Post=(props)=>{
    const {post}=props
    const [user]=useAuthState(auth);

    const [likeAmnt,setLikeAmnt]=useState(null)
    const likesRef=collection(db,"likes");

    const likesDoc=query(likesRef,where("postId","==",post.id));

    const getLikes=async ()=>{
        const data=await getDocs(likesDoc)
        setLikeAmnt(data.docs.map((doc)=>({userId:doc.data().userId})))
    }

    const addLike=async ()=>{
        await addDoc(likesRef,{
            userId:user?.uid,
            postId:post.id,
            username:user?.displayName
        })
        if(user) setLikeAmnt((prev)=>prev?[...prev,{userId:user?.uid}]:[{userId:user?.uid}])
    }

    const removeLike=async ()=>{
        const likestodeletequery=query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid));
        const liketoDeleteData=await getDocs(likestodeletequery);

        const liketodelete=doc(db,"likes",liketoDeleteData.docs[0].id);

        await deleteDoc(liketodelete)
        if(user) setLikeAmnt((prev)=>prev?.filter((like)=>like.id===liketoDeleteData.docs[0].id))
    }

    const hasUserLiked=likeAmnt?.find((like)=>like.userId===user?.uid)

    useEffect(()=>{
        getLikes()
    },[])

    return <div className="borderToForm">
        <div className="titile">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>

        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={hasUserLiked? removeLike:addLike}>{hasUserLiked?<>&#128078;</> :<>&#128077;</>}</button>
            {likeAmnt && <p>Likes : {likeAmnt?.length}</p>}
        </div>
    </div>
}