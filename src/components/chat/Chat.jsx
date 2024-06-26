import "./chat.css"
import { useEffect, useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../elements/firebase";
import useChatStore from "../../elements/chatStore";
import useUserStore from "../../elements/userStore";
import upload from "../../elements/upload";

const Chat = (props) => {
const [open,setOpen]=useState(false);
const [text,setText]=useState("");
const { chatId, user, isCurrentUserBlocked, isRecieverBlocked }=useChatStore();
const {currentUser}=useUserStore();
const [img,setImg]=useState({
    file:null,
    url:"",
}); // functionality to upload image

// for scrolling 
const endRef=useRef(null); 

useEffect(()=>{
    endRef.current?.scrollIntoView({ behavior: "smooth" });
},[]);

// implementing the message sending -----------------------------
const [chat,setChat]=useState();

useEffect(()=>{
    const unSub=onSnapshot(doc(db,"chats",chatId),(res)=>{
        setChat(res.data())
    });

    return ()=>{
        unSub();
    };

},[chatId]);

console.log(chat);




const handleSend= async ()=>{
    if(text==="")return;
    let imgUrl=null;

    try{

        if(img.file){
            imgUrl=await upload(img.file);
        }

        await updateDoc(doc(db,"chats",chatId),{
            messages:arrayUnion({
                senderId:currentUser.id,
                text,
                createdAt:new Date(),
                ...(imgUrl && {img: imgUrl}), // if its null we won't be putting
            })
        });

const userIDs=[currentUser.id,user.id];

userIDs.forEach(async (id)=>{ // for current active user and opponent

    
    // to make the "wethere seen or not"

        const userChatsRef=doc(db,"userchats",id);
        const userChatsSnapshot= await getDoc(userChatsRef);
        if(userChatsSnapshot.exists()){
            const userChatsData=userChatsSnapshot.data();

            // finding current chat index
            const chatIndex = userChatsData.chats.findIndex(c=>c.chatId === chatId);
// for active user
            userChatsData.chats[chatIndex].lastMessage=text;
            userChatsData.chats[chatIndex].isSeen=id===currentUser.id?true:false;
            userChatsData.chats[chatIndex].updatedAt=Date.now();

            await updateDoc(userChatsRef,{
                chats: userChatsData.chats,
            });
        }

    });
        
    }catch(err){
        console.log(err);
    }


    setImg({
        file:null,
        url:"",
    });
    setText("");
}



// message sending done -------------------------------
const handleEmoji=(e)=>{
    setText((prev)=>prev+e.emoji);
    setOpen(false);
};

const handleImg=(e)=>{
    if(e.target.files[0]){ setImg({
         file:e.target.files[0],
         url: URL.createObjectURL(e.target.files[0])
     })
   }
 }

console.log(text);
    return (
        <div className={(props.usersetting && !props.hometochat)?"chat":"chat dis"}>
            <div className="top">
                <div className="gobackwrapper" onClick={()=>{props.setHometochat(true);}}>
                    <img src="./goback.png" alt=""/>
                </div>
                <div className="user" onClick={()=>{props.setUsersetting(false);}}>
                    <img src={user?.avatar || "./avatar.png"} alt=""/>
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>hello this is only for testing</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt=""/>
                    <img src="./video.png" alt=""/>
                    <img src="./info.png" alt=""/>
                </div>
            </div>
            <div className="center">
{/* message break */}
        {chat?.messages?.map((message)=>(

            <div className={message.senderId===currentUser?.id?"message own":"message"} key={message?.createdAt}>
                    <div className="texts">
                    {/* when an image is sent  */}
                    
                        { message.img && <div className="imgdivwrapper"><img src={message.img}alt=""/> </div>}
                   
                        <p>
                            {message.text}
                        </p>
                        {/* <span>1 min ago</span> */}
                    </div>
                </div>

            ))}

{ img.url && (
            <div className="message own">
                <div className="texts">
                    <div className="imgdivwrapper">
                    <img src={img.url} alt=""/>
                    </div>
                </div>
            </div>
)}

{/* message break  */}
{/* to scroll initial  */}
            <div ref={endRef}></div>

            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">

                    <img src="./img.png" alt=""/>
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleImg} />
                    <img src="./camera.png" alt=""/>
                    <img src="./mic.png" alt=""/>
                </div>
                <input type="text" placeholder={(isCurrentUserBlocked||isRecieverBlocked)?"You cannot send a message":"Type a message..."} value={text} onChange={(e)=>setText(e.target.value)}
                disabled={isCurrentUserBlocked || isRecieverBlocked}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={()=>setOpen(!open)}/>
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isRecieverBlocked}>Send</button>
            </div>
        </div>
    );
}

export default Chat;