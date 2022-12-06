import React, {useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CreateUserForm from "../components/CreateUserForm";
import Header from "../components/Header";

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

            console.log({email, password});
            const auth = getAuth();

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setUserInformation({
                        email: user.email,
                        displayName: user.displayName,
                        uid: user.uid,
                        accessToken: user.accessToken,
                    });
                    setErrors();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({error, errorCode, errorMessage});
                    setErrors(errorMessage);
                });
        },
        [setErrors, setIsLoggedIn, setUserInformation]
    );

    return (
        <>
        <Header 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation}
            />
            <div className='PageWrapper'>
                <h1>Create User</h1>
                <CreateUserForm signUpUser={signUpUser}/>
                <p>{errors}</p>
            </div>
        </>
    );
}

export default CreateUserPage;