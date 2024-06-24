import "./chat.css"
import { useEffect, useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
const [open,setOpen]=useState(false);
const [text,setText]=useState("");
// for scrolling 
const endRef=useRef(null); 

useEffect(()=>{
    endRef.current?.scrollIntoView({ behavior: "smooth" });
},[]);

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

                <div className="message">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                    {/* when an image is sent  */}
                        <img src="./imagesent.jpg" alt=""/>
                        <p>
                            ehllo mello rohan is here
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

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