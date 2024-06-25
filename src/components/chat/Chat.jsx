import "./chat.css"
import { useEffect, useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useChatStore from "../../lib/chatStore";

const Chat = () => {
const [open,setOpen]=useState(false);
const [text,setText]=useState("");
const { chatId }=useChatStore()
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




// message sending done -------------------------------
const handleEmoji=(e)=>{
    setText((prev)=>prev+e.emoji);
    setOpen(false);
};
console.log(text);
    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <span>Rohan Kumar</span>
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

            <div className="message own" key={message?.createdAt}>
                    <div className="texts">
                    {/* when an image is sent  */}
                        { message.img && <img src={message.img}alt=""/>}
                        <p>
                            {message.text}
                        </p>
                        {/* <span>1 min ago</span> */}
                    </div>
                </div>

            ))}

{/* message break  */}
{/* to scroll initial  */}
            <div ref={endRef}></div>

            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt=""/>
                    <img src="./camera.png" alt=""/>
                    <img src="./mic.png" alt=""/>
                </div>
                <input type="text" placeholder="Type a message..." value={text} onChange={(e)=>setText(e.target.value)}/>
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={()=>setOpen(!open)}/>
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
}

export default Chat;