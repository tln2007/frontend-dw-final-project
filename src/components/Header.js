import React from 'react';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
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
    console.log(isLoggedIn)
    return (
        <header>
            <nav className='Navbar'>
                {isLoggedIn && <Link to="/">
                    <p>Home</p>
                </Link>}
                {!isLoggedIn && <Link to="/login">
                    <p>Login</p>
                </Link>}
                {!isLoggedIn && <Link to="/create">
                    <p>Create User</p>
                </Link>}
                {isLoggedIn && <Link to="/create-post">
                    <p>Create Post</p>
                </Link>}
                {isLoggedIn && <Link to="//user/:id">
                    <p>My Profile</p>
                </Link>}
                {isLoggedIn && <p onClick={() => logout()}><Link>Log Out</Link></p>}
            </nav>
        </header>
    );
}

export default Header;