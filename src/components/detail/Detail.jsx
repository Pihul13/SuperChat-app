import { auth } from "../../lib/firebase";
import "./detail.css"
const Detail = () => {
    return (
        <div className='detail'>
            <div className="user">
                <img src="./avatar.png" alt=""/>
                <h2>Rohan Kumar</h2>
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

                <button>Block User</button>
                <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
            </div>
        </div>
    );
}

export default Detail;