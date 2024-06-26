import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./elements/firebase"
import useUserStore from "./elements/userStore"
import useChatStore from "./elements/chatStore"

const App = () => {

const {currentUser,isLoading,fetchUserInfo}=useUserStore();
const {chatId}=useChatStore();

const [usersetting,setUsersetting]=useState(true); // true means chat , false means setting page
const [hometochat,setHometochat]=useState(true);
// true means home.. false means chat

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
          <List hometochat={hometochat} setHometochat={setHometochat}/>
          {chatId && <Chat usersetting={usersetting} setUsersetting={setUsersetting} hometochat={hometochat} setHometochat={setHometochat}/>}
          {chatId && <Detail usersetting={usersetting} setUsersetting={setUsersetting}/>}
          </>
        ):(<Login/>)
      }
      <Notification/>
    </div>
  );
}

export default App