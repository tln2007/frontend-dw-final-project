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
                    <strong>Display Name: </strong>
                    {userInformation.displayName}
                </p>
                <p>
                    <strong>Email: </strong>
                    {userInformation.email}
                </p>
            </div>
            <header>
                {isLoggedIn && <p onClick={() => logout()}><Link to="/">Log Out</Link></p>}
            </header>
        </>
    );
}

export default UserProfilePage;