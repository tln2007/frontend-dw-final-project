import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function UserProfilePage({ isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    function logout() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation({});
                setIsLoggedIn(false);
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/login'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate]) //dependencies

    return (
        <>
            
            <div className="UserPageWrapper">
                <h1>User Profile</h1>
                <p>
                    <strong>
                        {userInformation.displayName}'s Bakery
                    </strong>
                </p>
            </div>
        </>
    );
}

export default UserProfilePage;