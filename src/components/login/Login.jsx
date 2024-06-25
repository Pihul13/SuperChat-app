import { useState } from "react";
import "./login.css"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login=()=>{

    const [avatar,setAvatar]=useState({
        file:null,
        url:""
    });
// to disable the button while loading
    const [loading, setLoading]=useState(false);

    const handleAvatar=(e)=>{
       if(e.target.files[0]){ setAvatar({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
      }
    }
// handling the singin --------------------------------------------
    const handlelogin= async (e)=>{
        e.preventDefault();
        setLoading(true);


        const formData = new FormData(e.target);

        const {email, password} = Object.fromEntries(formData);


        try{

            await signInWithEmailAndPassword(auth,email,password);

        }catch(err){
            console.log(err);
            toast.error(err.message);

        }finally{
            setLoading(false);
        }
    };


// signing in done ----------------------------------------------

    // taking the form data from the form --------------------------------------------

    // fixing the bug in firebase authentication

    function isCorrectForm(username, email, password) {
        const isValidUsername = username.trim().length >= 1;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPassword = password.length >= 6;
    
        return isValidUsername && isValidEmail && isValidPassword;
    }
    

    const handleRegister= async (e)=>{

        console.log(avatar);

        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.target);

        const {username, email, password} = Object.fromEntries(formData);


        if(isCorrectForm(username,email,password) && avatar.file!==null){

            try{
                
                const res = await createUserWithEmailAndPassword(auth,email,password);
                
                const imgUrl= await upload(avatar.file);
                
                await setDoc(doc(db,"users", res.user.uid),{
                    username,
                    email,
                    avatar: imgUrl,
                    id:res.user.uid,
                    blocked: [] // pass the id here
                });
                
                // chats for this user
                await setDoc(doc(db,"userchats", res.user.uid),{
                    chats:[]
                });
                
                toast.success("Account Created! You can login now!")
                
            } catch (err){
                // handling the error
                if(err.message==="Firebase: Error (auth/email-already-in-use).")toast.error("Error (auth/email-already-in-use).")
                else toast.error("Something went wrong !!!")
            } finally {
                setLoading(false);
            }
        }else{
            // just a pseudo element, no use
            setTimeout(() => {
                if(avatar.file===null){
                    toast.error("Please upload Profile Pic.");
                }else if(password.length<6){
                    toast.error("Password should be at least 6 characters long");
                }else if(username.length<1){
                    toast.error("Username can't be empty");
                }else{
                    toast.error("Invalid Email");
                }
                setLoading(false);
            }, 400);
        }
            
        }


    // registration data done -------------------------------------------------------------
        
    return (
        <div className="login">
            <div className="item">
                <h2>Welcome Back</h2>
                <form onSubmit={handlelogin}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading? "Loading":"Sign In"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt=""/>
                        Upload an Image</label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                     <input type="text" placeholder="Username" name="username"/>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading? "Loading":"Sign Up"}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;