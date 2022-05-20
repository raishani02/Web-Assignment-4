import React from "react";
import "./myposts.css";
import Pagination from '../homepage/pagination';
import { getmyposts } from "../../Actions/getmyposts";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../homepage/navbar";

import Post from "../post/post";

const Myposts = () => {
  var history = useHistory();
  //it will check from the server if the token is authenticated
  const [authenticated, setauthenticated] = React.useState(false);
  const [Loaded, setLoaded] = React.useState(false)
  const [myposts, setmyposts] = React.useState([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(4);

  const [ref, setref] = React.useState(true)
  React.useEffect(() => {
    getmyposts(
      (error) => {
        setauthenticated(false);
        setLoaded(true)
      },
      (success) => {
        console.log(success.data)
        setmyposts(success.data.reverse());
        setauthenticated(true);
        setLoaded(true)
      }
    );
  },[ref]);

  const refreshfunc = () =>{
    console.log('refresher called')
    //window.location.reload();
    setref(!ref)
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myposts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    Loaded ? (
      <div className="bgd">
      {authenticated ? (
        <div>
            <Navbar/>
          <div className="container-fluid hpage">
            <div className="row " style={{justifyContent: "center"}}>
              <div className="col-md-8 col-sm-10 d-flex flex-column mx-autoo">
                {currentPosts.map((blog) => (
                  <Post key={blog.title} blog={blog} refresher = {refreshfunc} opfield={true} />
                ))}
                <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={myposts.length}
            paginate={paginate}
      />
              </div>
            </div>
          </div>
        </div>
      ): (
        //:history.push("/login")
        <div className="deny" style={{color:"white"}}>
          <h1>
            <b> Access Denied</b>
          </h1>
          <h6>
            Please
            <Link style={{color: "white"}} to="/login"> Log In </Link>
            First :
          </h6>
        </div>
      )}
    </div>
    ) : (
      <div className="bgd">
            <h3 className="ms-5 mt-5 ">Loading...</h3>
        </div>
    )
    
  );
};
export default Myposts;
