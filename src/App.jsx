import List from "./list/List"
import Chat from "./chat/Chat"
import Detail from "./detail/Detail"
import Login from "./login/Login"
const App = () => {

  const user=false;

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
    </div>
  );
}

export default App