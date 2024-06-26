import "./list.css"
import Userinfo from "./userInfo/Userinfo"
import ChatList from "./chatList/ChatList"
const List = (props) => {
    return (
        <div className={props.hometochat?"list":"list dis"}>
            <Userinfo/>
            <ChatList hometochat={props.hometochat} setHometochat={props.setHometochat}/>
        </div>
    );
}

export default List;