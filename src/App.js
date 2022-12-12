import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Styles and Components
import './App.css';
import CreateUserPage from './pages/CreateUser';
import LoginPage from './pages/Login';
import UserProfilePage from './pages/UserProfile';
import DashboardPage from './pages/Dashboard';
import CreatePostPage from "./pages/CreatePost";

const firebaseConfig = {
  apiKey: "AIzaSyDTaYdK3bLiYYZhobXPv3ZdVqeIpXqt5zk",
  authDomain: "dw-final-fall-2022.firebaseapp.com",
  projectId: "dw-final-fall-2022",
  storageBucket: "dw-final-fall-2022.appspot.com",
  messagingSenderId: "640495087103",
  appId: "1:640495087103:web:651dbd6d49e8ea260d4bca"
};

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    // Initialize firebase
    const app = initializeApp(firebaseConfig);
    setAppInitialized(app);
  }, []);
  // check if user is logged in
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setIsLoggedIn(true)
        } else {
          setUserInformation({});
          setIsLoggedIn(false);
        }
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DashboardPage
          app={appInitialized}
          isLoading={isLoading} 
          isLoggedIn={isLoggedIn} 
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation}
         />
      ),
    },
    {
        path: "/login",
        element: (
          <LoginPage 
            isLoading={isLoading} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation}
          />
        ),//prop isLoggedIn tells us if false, go to login or create, if true, go to user profile
    },
    {
        path: "/create",
        element: (
          <CreateUserPage 
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation} />
        ),
    },
    {
      path: "/dashboard",
      element: (
        <DashboardPage 
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation} />
      ),
    },
    {
      path: "/user/:id",
      element: (
        <UserProfilePage
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation} />
      ),
    },
    {
      path: "/create-post",
      element: (
        <CreatePostPage
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation} />
      ),
    },
  ]);
  //ensure app is initialized when it is ready to be
  useEffect(() => { //only do after first render
    //initialize firebase
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, [])

  //check to see if user is logged in
  //if logged in, load page and check user status
  //set state accordingly
  useEffect(() => {
    if(appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) =>{
        if(user) {
          //user is signed in, see docs for a list of available properties
          setUserInformation(user);
          setIsLoggedIn(true);
        }
        else {
          //user is signed out
          setUserInformation({});
          setIsLoggedIn(false);
        }
        //whenever state changes setLoading to false
        setIsLoading(false);
      })
    }
  }, [appInitialized])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
