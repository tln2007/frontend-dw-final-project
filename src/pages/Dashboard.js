import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import ImagePost from "../components//ImagePost";
import Header from "../components/Header";

const queryData = async (app) => {
    if (!app) return [];
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "posts"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;

};

function DashboardPage({
    app,
    isLoading,
    isLoggedIn,
    setLoggedIn,
    setUserInformation,
}) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        if (!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]);

    useEffect(() => {
        if (!app) return;
        const data = queryData(app).then(setPostData);

    }, [app]);

    return (
        <>
            <Header>
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
            </Header>
            <div className="PageWrapper">
                <div className="ImagePostWrapper">
                    {postData && postData.map((post) => (
                        <ImagePost
                        caption={post.caption}
                        imageAlt={post.imageAlt}
                        imageUrl={post.imageUrl}
                        userId={post.userId}
                        userName={post.userName}
                    />
                    ))}
                 
                </div>
            </div>
        </>
    );
}

export default DashboardPage;