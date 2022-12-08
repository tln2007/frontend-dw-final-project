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

function Dashboard(){
    return (
        <div>
            <h1>Feed</h1>
        </div>
    )
}

export default Dashboard;