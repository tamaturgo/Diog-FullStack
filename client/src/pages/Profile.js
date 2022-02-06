import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <h1> Username: <span>@{username}</span> <hr></hr></h1>
        {authState.username === username && (
          <button
            className="changePass"
            onClick={() => {
              history.push("/changepassword");
            }}
          >
            {" "}
            Change My Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post homePost">
              <div className="postheader">
              <span className="usernick">@ {value.username}</span>
              <span className="title"> - {value.title}</span>
            </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
              <div className="buttons">
                <ThumbUpAltIcon
                  className="unlikeBttn"
                />

                <label> {value.Likes.length}</label>
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
