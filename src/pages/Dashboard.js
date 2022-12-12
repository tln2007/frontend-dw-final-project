import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import ImagePost from "../components//ImagePost";

// const queryData = async (app) => {
//     if (!app) return [];
//     const db = getFirestore(app);
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     const data = [];
//     querySnapshot.forEach((doc) {
//         data.push(doc.data());
//     });

// }

function DashboardPage({
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
        if(postData.length > 0) return;
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setPostData(data);
    }, [app])

    return (
        <>
            <Header>
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
            </Header>
        </>
    )
}

export default DashboardPage;