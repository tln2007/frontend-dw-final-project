import React, {useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CreateUserForm from "../components/CreateUserForm";
//import Header from "../components/Header";
import { Link } from "react-router-dom";

function CreateUserPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    const signUpUser = useCallback(
        (e) => {
            e.preventDefault();
            // Assign Email and Password to variable from form
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const displayName = e.currentTarget.displayName.value;

            const auth = getAuth();

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setErrors();

                    updateProfile(user, { displayName: displayName })
                        .then(() => {
                            setUserInformation({
                                email: user.email,
                                displayName: displayName,
                                uid: user.uid,
                                accessToken: user.accessToken,
                            });
                        })
                        .catch((err) => {
                            const errorCode = err.code;
                            const errorMessage = err.message;
                            console.warn({err, errorCode, errorMessage});
                            setErrors(errorMessage);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({ error, errorCode, errorMessage });
                    setErrors(errorMessage);
                });
        },
        [setErrors, setIsLoggedIn, setUserInformation]
    );

    return (
        <>
            <div className='CreatePageWrapper'>
                
                <h1>Create User</h1>
                <CreateUserForm signUpUser={signUpUser}/>
                <p>{errors}</p>
                <p>Already have an account?</p>
                <p>
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </>
    );
}

export default CreateUserPage;