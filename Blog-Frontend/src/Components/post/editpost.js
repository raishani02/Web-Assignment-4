import "./editpost.css"
import { useHistory } from "react-router-dom";
import Navbar from "../homepage/navbar";
import "react-notifications/lib/notifications.css";
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
import React from "react";
import "./editpost.css";
import { postblog } from "../../Actions/postblog";

import { getspecificpost } from "../../Actions/getspecificpost";
import { updatepost } from "../../Actions/updatepost";
import { Link } from "react-router-dom";
import Homepage from "../homepage/Homepage";
// import { useHistory } from "react-router-dom";

function sleep(time){
  return new Promise((resolve)=>setTimeout(resolve,time)
)
}

function Editpost(props) {
  let history = useHistory();
  const {
    params: { postId },
  } = props.match;

  const [isLoading, setisLoading] = React.useState(false);
  const [blog, setBlog] = React.useState({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    getspecificpost(
      postId,
      (err) => {
        console.log(err);
      },
      (succ) => {
        console.log(succ.data);
        setBlog(succ.data);
        setisLoading(true);
      }
    );
  }, []);

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!e.target.description.value) {
    } else {
      updatepost(
        blog,
        (err) => {
          console.log(err);
        },
        (succ) => {
          console.log("blog updated successfully");
          NotificationManager.success("Blog updated");
          
          console.log("blog updated successfully23");
          //sleep 
          //history.push('/');
          sleep(2000).then(()=>{
            history.push("/");
          })
        }
      );

    }
  };

  return (
    <div
      style={{
       
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      }} className="image-bg"
    >
      {isLoading && (
        <div >
          <Navbar />
          <NotificationContainer />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-sm-10 d-flex flex-column mx-auto">
               
          <div className="card border-secondary m-4">
            <div className="card-body text-secondary">
              <div>
                <p className="card-text">
                  <b>Edit this post</b>
                </p>
                <form
                  className="login-form__group"
                  onSubmit={(e) => onSubmit(e)}
                >
                  <input
                    name="title"
                    type="text"
                    value={blog.title}
                    onChange={(e) => handleChange(e)}
                    className="input-field-create"
                    placeholder="Blog Title"
                    style={{ fontWeight: "bold" }}
                  />
                  <textarea
                    name="description"
                    className="border-0 my-1 input-field-create"
                    value={blog.description}
                    rows="2"
                    onChange={(e) => handleChange(e)}
                    placeholder="Blog body"
                    style={{ width: "100%" }}
                  ></textarea>
                  <div className="text-center mb-1 d-flex justify-content-end">
                    <input
                      type="submit"
                      className="btn btn-secondary px-3 mx-5"
                      value="Post"
                    />
                  </div>
                </form>
                
              </div>
            </div>
          </div>
          </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editpost;
