import { useState } from "react";
import "./chatList.css"

const ChatList = () => {
    const [addMode,setaddMode]=useState(true);
    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt=""/>
                    <input type="text" placeholder="Search"/>
                </div>
                <img src={addMode?"./plus.png":"./minus.png"} alt="" className="add" onClick={()=>{setaddMode(!addMode)}}/>
            </div>
{/* break */}
            <div className="item">
                <img src="./avatar.png" alt=""/>
                <div className="texts">
                    <span>Rohan Kumar</span>
                    <p>Hellothere</p>
                </div>
            </div>

            <div className="item">
                <img src="./avatar.png" alt=""/>
                <div className="texts">
                    <span>Rohan Kumar</span>
                    <p>Hellothere</p>
                </div>
            </div>

            <div className="item">
                <img src="./avatar.png" alt=""/>
                <div className="texts">
                    <span>Rohan Kumar</span>
                    <p>Hellothere</p>
                </div>
            </div>

            <div className="item">
                <img src="./avatar.png" alt=""/>
                <div className="texts">
                    <span>Rohan Kumar</span>
                    <p>Hellothere</p>
                </div>
            </div>
{/* break */}
        </div>
    );
}

export default ChatList;