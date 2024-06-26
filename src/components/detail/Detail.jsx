import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useChatStore from "../../elements/chatStore";
import { auth, db } from "../../elements/firebase";
import useUserStore from "../../elements/userStore";
import "./detail.css"
const Detail = (props) => {
    const {chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlock}=useChatStore();
    const {currentUser}=useUserStore();


    //  console.log(isCurrentUserBlocked);

    const handleBlock= async ()=>{
        if(!user)return;

        const userDocRef=doc(db,"users",currentUser.id);

        try{
            await updateDoc(userDocRef,{
         blocked: isRecieverBlocked?arrayRemove(user.id):arrayUnion(user.id)
            });

            changeBlock();

        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className={props.usersetting?"detail dis":"detail"}>
            <div className="user" onClick={()=>{
                props.setUsersetting(true);
            }}>
                <img src={user?.avatar || "./avatar.png"} alt=""/>
                <h2>{user?.username}</h2>
                <p>this is the sender's description</p>
            </div>
            <div className="info">
{/* option break  */}
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt=""/>
                    </div>
                    <div className="photos">
        {/* photo item shared  */}
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./imagesent.jpg" alt=""/>
                            <span>Photo_2024.png</span>
                            </div>
                        <img src="./download.png" alt="" className="icon"/>
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./imagesent.jpg" alt=""/>
                            <span>Photo_2024.png</span>
                            </div>
                        <img src="./download.png" alt="" className="icon"/>
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./imagesent.jpg" alt=""/>
                            <span>Photo_2024.png</span>
                            </div>
                        <img src="./download.png" alt="" className="icon"/>
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./imagesent.jpg" alt=""/>
                            <span>Photo_2024.png</span>
                            </div>
                        <img src="./download.png" alt="" className="icon"/>
                        </div>

 {/* photo item shared  */}
                    </div>
                </div>

                
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>

{/* option break  */}

                <button onClick={handleBlock}>
                    {isCurrentUserBlocked?"You are Blocked!":
                    isRecieverBlocked?"User Blocked":
                    "Block User"}
                </button>
                <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
            </div>
        </div>
    );
}

export default Detail;