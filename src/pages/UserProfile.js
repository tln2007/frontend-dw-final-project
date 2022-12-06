import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function UserProfilePage({ isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/login'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate]) //dependencies

    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
                setUserInformation={setUserInformation} 
            />
            <div className="PageWrapper">
                <h1>User Profile</h1>
                <p>
                    <strong>Display Name: </strong>
                    {userInformation.displayName}
                </p>
                <p>
                    <strong>Email: </strong>
                    {userInformation.email}
                </p>
                <p>
                    <strong>User ID: </strong>
                    {userInformation.uid}
                </p>
            </div>
        </>
    );
}

export default UserProfilePage;