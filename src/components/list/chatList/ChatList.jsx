import { useEffect, useState } from "react";
import "./chatList.css"
import AddUser from "./addUser/AddUser";
import useUserStore from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
    const [addMode,setaddMode]=useState(false);
    const [chats,setChats]=useState([]);

    // getting the real time chat data from snap

    const {currentUser} = useUserStore();

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"userchats",currentUser.id),async (res)=>{
            const items=res.data().chats; // lists

            const promises = items.map(async(item)=>{
                const userDocRef = doc(db,"users",item.reciverId);
                const userDocSnap = await getDoc(userDocRef); // getting the user information of the reciever from the recieverID

                const user=userDocSnap.data();

                return {...item,user}; // chat_id, reciever_id, isseen, lastmessage, updatedAt, user(this has the name, avatar, email, blockedlist)
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt));

        });

        return ()=>{
            unSub();
        }
    },[currentUser.id]);

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt=""/>
                    <input type="text" placeholder="Search"/>
                </div>
                <img src={!addMode?"./plus.png":"./minus.png"} alt="" className="add" onClick={()=>{setaddMode(!addMode)}}/>
            </div>
{/* break */}
        {chats.map((chat)=>( // we need a key for map

            <div className="item" key={chat.chatId}>
                <img src="./avatar.png" alt=""/>
                <div className="texts">
                    <span>Rohan Kumar</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>

        ))}
{/* break */}
        {addMode && <AddUser/>} 
        </div>
    );
}

export default ChatList;