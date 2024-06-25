import { useEffect, useState } from "react";
import "./chatList.css"
import AddUser from "./addUser/AddUser";
import useUserStore from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import useChatStore from "../../../lib/chatStore";

const ChatList = () => {
    const [addMode,setaddMode]=useState(false);
    const [chats,setChats]=useState([]);

    // to get the chatlist search functionality

    const [input, setInput] = useState("");

    // getting the real time chat data from snap

    const {currentUser} = useUserStore();

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"userchats",currentUser.id),async (res)=>{
            const items=res.data().chats; // lists

            const promises = items.map(async(item)=>{
                const userDocRef = doc(db,"users",item.recieverId);
                const userDocSnap = await getDoc(userDocRef); // getting the user information of the reciever from the recieverID

                const user=userDocSnap.data();

                return {...item,user}; // mergin user in item
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt));// a and b are objects

        });

        return ()=>{
            unSub();
        }
    },[currentUser.id]);

////// implementing the active chat color change on seen and not seen

    const {changeChat }=useChatStore();

    const handleSelect = async (chat) => {

        const userChats=chats.map((item)=>{
            const {user, ...rest }=item;
            return rest;
        });

        const chatIndex = userChats.findIndex(
            (item)=>item.chatId===chat.chatId
        );

        userChats[chatIndex].isSeen=true;

        const userChatsRef=doc(db, "userchats", currentUser.id);

        try{

            await updateDoc(userChatsRef,{
                chats:userChats,
            });
            
            changeChat(chat.chatId,chat.user);

        }catch(err){
            console.log(err);
        }


      };


      // search chatlist functionality
      const filteredChats = chats.filter(c=>c.user.username.toLowerCase().includes(input.toLocaleLowerCase()))



    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt=""/>
                    <input type="text" placeholder="Search" onChange={(e)=>setInput(e.target.value)}/>
                </div>
                <img src={!addMode?"./plus.png":"./minus.png"} alt="" className="add" onClick={()=>{setaddMode(!addMode)}}/>
            </div>
{/* break */}
        { filteredChats.map((chat)=>( // we need a key for map

            <div className="item" key={chat.chatId} 
            onClick={()=>handleSelect(chat)}
            style={{
                backgroundColor:chat?.isSeen?"transparent":"#5183fe"
            }}
            >
                <img src={ chat.user.blocked.includes(currentUser.id)?"./avatar.png": chat.user.avatar || "./avatar.png"} alt=""/>
                <div className="texts">
                    <span>{chat.user.blocked.includes(currentUser.id)?"User":chat.user.username}</span>
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