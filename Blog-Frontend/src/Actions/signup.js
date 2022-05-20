import axios from "axios"

export const signup = (user, callbackerr, callbacksuccess) =>{
    axios.post('http://localhost:5000/api/user/register', user)
  .then(function (response) {
    callbacksuccess('Successfully Registered')
  }).catch(function(error){
      console.log("Error occured in signup" + error.response.data);
      callbackerr(error.response.data);
  })
}