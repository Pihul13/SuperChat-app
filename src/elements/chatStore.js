import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';
import useUserStore from './userStore';

// Zustand store for managing user state
// returns a prop like object with hook ability
const useChatStore = create((set) => ({
chatId:null,
user:null,
isCurrentUserBlocked:false,
isRecieverBlocked:false,

 changeChat: (chatId,user)=>{
  const currentUser=useUserStore.getState().currentUser;

  // checking if current user is blocked

  if(user.blocked.includes(currentUser.id)){
    return set({
      chatId,
      user:null,
      isCurrentUserBlocked:true,
      isRecieverBlocked:false
    });
  }

  //checking if reciever is blocked

  else if(user.blocked.includes(user.id)){
    return set({
      chatId,
      user:user,
      isCurrentUserBlocked:false,
      isRecieverBlocked:true
    });
  }

else { 

  return set({
    chatId,
    user,
    isCurrentUserBlocked:false,
    isRecieverBlocked:false
  });
}

 },

 changeBlock:()=>{
  set(state=>({...state,isRecieverBlocked:!state.isRecieverBlocked}));
 }

}));

export default useChatStore;
