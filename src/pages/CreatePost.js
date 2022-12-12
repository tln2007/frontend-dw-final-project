import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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

    const createPost = useCallback((e) => {
            e.preventDefault();
            const db = getFirestore(app);
            const storage = getStorage();

            const imageToUpload= e.currentTarget.imageToUpload.files;
            console.log({imageToUpload})
            const imageRef = ref(storage, '.jpg');

            uploadBytes(imageRef, file).then((snapshot) => {
                console.logo("upload a file!", snapshot)
            });

            const caption = e.currentTarget.caption.value;
            const imageAlt = e.currentTarget.imageAlt.value;
            const userName = userInformation.displayName;
            const userId = userInformation.uid;

            try {
                const docRef = addDoc(collection(db, "posts"), {
                    caption,
                    imageAlt,
                    imageUrl,
                    userId: userId,
                    userName,
                });
                console.log("Document written with ID: ", docRef.id);
                setPostSuccessful(true);
            } catch (e) {
                console.error("Error adding document: ", e);     
            }
        },
        [app, userInformation]
    );
    console.log({ userInformation });
    useEffect(() => {
        if (!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]);

    return (
        <>
        </>
    )
}

export default CreatePostPage;