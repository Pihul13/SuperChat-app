import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import useUserStore from "./lib/userStore"

const App = () => {

const {currentUser,isLoading,fetchUserInfo}=useUserStore();

// getting the login logout status
    useEffect(()=>{
      const unSub = onAuthStateChanged(auth,(user)=>{
        fetchUserInfo(user?.uid);
      });
//wld ue v // cleanup function
      return ()=>{
        unSub();
      };

  },[fetchUserInfo]);// ensuring the latest fetchfunction is used

  console.log(currentUser);
  if(isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container'>
  {/* imbedding js in jsx  */}
      { 
        currentUser?(
          <>
          <List/>
          <Chat/>
          <Detail/>
          </>
        ):(<Login/>)
      }
      <Notification/>
    </div>
  );
}

export default App