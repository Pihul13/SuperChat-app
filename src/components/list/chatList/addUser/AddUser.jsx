import { collection, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import "./addUser.css"
import { useState } from "react";
import { db } from "../../../../lib/firebase";
db

const AddUser=()=>{

    const [user, setUser]=useState(null);


    const handleSearch = async (e) =>{
        e.preventDefault();
        const formData= new FormData(e.target);
        const username = formData.get("username");


        try{

            const userRef = collection(db,"users");

             const q=query(userRef, where("username","==",username));

             const querySnapShot= await getDocs(q);
             if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data());
             }

        }catch(err){
            console.log(err);
        };

        const handleAdd=async (e)=>{
// chats is inside the userchat schema
            const chatRef=collection(db,"chats");
            const userChatsRef=collection(db,"userchats");

            try{

                const newChatRef=doc(chatRef);

                await setDoc(newChatRef,{
                    createdAt:serverTimestamp(),
                    messages:[]
                });

            }catch (err){
                console.log(err);
            }
        }

    }

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username"/>
                <button>Search</button>
            </form>{
                user && 
                <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt=""/>
                    <span>{user.username}</span>
                </div>
                <button >Add User</button>
            </div>
            }
        </div>
    )
}

export default AddUser;