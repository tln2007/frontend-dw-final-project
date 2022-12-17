import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
//import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ImagePost from "../components//ImagePost";
import Header from "../components/Header";


function UserProfilePage({ app, isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);

    // eslint-disable-next-line
    const queryData = async (app) => {
        if (!app) return [];
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().userId === userInformation.uid){
                data.push(doc.data());
            }
        });
        return data;
    };
    
    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/login'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate]) //dependencies

    useEffect((queryData) => {
        if (!app) return;
        queryData(app).then(setPostData);
    }, [app]);

    return (
        <>
        <div className='UserPage'>
            <div className="UserPageWrapper">
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserInformation={setUserInformation}
            />

                <div className='BakeryName'>
                    <strong>{userInformation.displayName}'s Bakery</strong>
                    <h2>Posts</h2>
                </div>
                <p>
                    <div className="MyPosts">
                    {postData && postData.map((post) => (
                        <ImagePost
                        ingredients={post.ingredients}
                        instructions={post.instructions}
                        servings={post.servings}
                        title={post.title}
                        userId={post.userId}
                        userName={post.userName}
                        />
                    ))}
                 
                </div>
                </p>
            </div>
        </div>
        </>
    );
}

export default UserProfilePage;
