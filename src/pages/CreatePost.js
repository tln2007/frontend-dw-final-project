import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Header from "../components/Header";
import CreatePostForm from "../components/CreatePostForm";

function CreatePostPage({
    app,
    isLoading, 
    isLoggedIn, 
    setLoggedIn,
    setUserInformation, 
    userInformation,
}) {
    const navigate = useNavigate();
    const [postSuccessful, setPostSuccessful] = useState(false);

    const createPost = useCallback((e) => {
            e.preventDefault();
            const db = getFirestore(app);

            const ingredients = e.currentTarget.ingredients.value;
            const instructions = e.currentTarget.instructions.value;
            const servings = e.currentTarget.servings.value;
            const title = e.currentTarget.title.value;
            const userName = userInformation.displayName;
            const userId = userInformation.uid;

            try {
                addDoc(collection(db, "posts"), {
                    ingredients, 
                    instructions, 
                    servings, 
                    title,
                    userId: userId,
                    userName,
                });
    
                setPostSuccessful(true);
            } catch (e) {
                console.error("Error adding document: ", e);     
            }
        },
        [setPostSuccessful, app, userInformation]
    );
   
    useEffect(() => {
        if (!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]);

    return (
        <>
        <div className="CreatePostPage">
            <Header
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
            />
            <div className='CreatePostWrapper'>
                <h1>Create Post</h1>
                <CreatePostForm createPost={createPost}/>
                <p>{postSuccessful && "Post successful!"}</p>
                
            </div>
        </div>
        </>
    )
}

export default CreatePostPage;