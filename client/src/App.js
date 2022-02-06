import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

//Imagens
import logo1 from "./assets/logo.png"
import logo2 from "./assets/nave.svg"
import logo3 from "./assets/personagens.svg"


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <img src={logo1} />
            <div className="links">
              {!authState.status ? (
                <>
                <Link to="/login">
                  <img src={logo3} />
                  <p>Home Page</p>
                </Link>
                <Link to="/login">
                  <img src={logo2} />
                  <p>Create A Post</p>
                </Link>
              </>
                
              ) : (
                <>
                  <Link to="/">
                    <img src={logo3} />
                    <p>Home Page</p>
                  </Link>
                  <Link to="/createpost">
                    <img src={logo2} />
                    <p>Create A Post</p>
                  </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">

            {!authState.status &&
                <>
                  <Link to="/login"><button>Sign in</button></Link>
                  <Link to="/registration"><button>Sign up</button></Link>
                </>}
              
              {authState.status && <button onClick={logout}> Logout</button>}
              <h1>{authState.username} </h1>
            </div>
          </div>
          <div className="dir">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/createpost" exact component={CreatePost} />
              <Route path="/post/:id" exact component={Post} />
              <Route path="/registration" exact component={Registration} />
              <Route path="/login" exact component={Login} />
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/changepassword" exact component={ChangePassword} />
              <Route path="*" exact component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
