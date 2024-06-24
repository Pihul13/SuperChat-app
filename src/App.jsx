import List from "./list/List"
import Chat from "./chat/Chat"
import Detail from "./detail/Detail"
import Login from "./login/Login"
import Notification from "./notification/Notification"

const App = () => {

  const user=true;

  return (
    <div className='container'>
  {/* imbedding js in jsx  */}
      { 
        user?(
          <>
          <List/>
          <Chat/>
          <Detail/>
          </>
        ):(<Login/>)
      }
      <Notification/>
    </div>
  );
}

export default App