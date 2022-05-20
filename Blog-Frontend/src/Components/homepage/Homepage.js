import React from "react";
import "./Homepage.css";
import Pagination from './pagination';
import { allposts } from "../../Actions/getposts";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./navbar";
import Createpost from "../post/createpost";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Post from "../post/post";

const Homepage = () => {
  var history = useHistory();
  //it will check from the server if the token is authenticated
  const [authenticated, setauthenticated] = React.useState(false);
  const [ref, setref] = React.useState(false);
  const [posts, setposts] = React.useState([]);

  const [Loaded, setLoaded] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(3);

  React.useEffect(() => {
    allposts(
      (error) => {
        setauthenticated(false);
        setLoaded(true);
      },
      function posts(success) {
        // console.log("success"+success.data);
        setposts(success.data.reverse());
        console.log(success.data);
        setauthenticated(true);
        setLoaded(true);
      }
    );
  }, [ref]);

  //here we go

  const changeit = () => {
    //The funtion will run when new blog is posted
    //hence it will make the current array to update
    console.log("inside change");
    NotificationManager.success("New Blog Added");
    setref(!ref);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    Loaded ? (
      <div className="bgd">
      {authenticated ? (
        <div >
            <Navbar/>
            <NotificationContainer />
          <div className="container-fluid hpage">
            <div className="row">
              <div className="col-md-8 col-sm-10 d-flex flex-column mx-auto">
                <Createpost changer={changeit} />
                {currentPosts.map((blog) => (
                  <Post key={blog.title} blog={blog} opfield={false} />
                ))}
                <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
      />
              </div>
            </div> 
          </div>
        </div>
      ) : (
        //:history.push("/login")
        <div className="deny" style={{color:"white"}}>
          <h1>
            <b> Access Denied</b>
          </h1>
          <h6>
            Please
            <Link style={{color:"white"}} to="/login"> Log In </Link>
            First :
          </h6>
        </div>
      )}
    </div>
    ) : (<h2>
      Loading...
    </h2>) 
    
  );
};
export default Homepage;
