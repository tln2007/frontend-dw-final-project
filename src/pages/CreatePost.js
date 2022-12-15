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
    const [setPostSuccessful] = useState(false);

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
                const docRef = addDoc(collection(db, "posts"), {
                    ingredients, 
                    instructions, 
                    servings, 
                    title,
                    userId: userId,
                    userName,
                });
                console.log("Document written with ID: ", docRef.id);
                setPostSuccessful(true);
            } catch (e) {
                console.error("Error adding document: ", e);     
            }
        },
        [setPostSuccessful, app, userInformation]
    );
    console.log({ userInformation });
    useEffect(() => {
        if (!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]);

    return (
        <>
        <div className="CreatePostPage">
            <div className='CreatePostWrapper'>
                <Header
                    isLoggedIn={isLoggedIn}
                    setLoggedIn={setLoggedIn}
                    setUserInformation={setUserInformation}
                />
                <h1>Create Post</h1>
                <CreatePostForm createPost={createPost}/>
                
            </div>
        </div>
        </>
    )
}

export default CreatePostPage;