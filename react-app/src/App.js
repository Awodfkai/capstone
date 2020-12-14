import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Upload from "./components/Upload";
import Home from "./components/Home";
import VideoView from "./components/VideoView";
import UserContext from "./context/UserContext"
import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user ,setUser] = useState()

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors && user) {
        setUser(user)
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }
  

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}} >
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/upload" exact={true} authenticated={authenticated}>
          <Upload />
        </ProtectedRoute>
        <Route path="/videos/:vid">
          <VideoView />
        </Route>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
