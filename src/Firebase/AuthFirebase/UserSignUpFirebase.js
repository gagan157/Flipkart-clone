import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '../FirebaseConfig';
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(app);
console.log(auth.currentUser)
export default function craeteUserUsingFirebase(singnupUserData){
    createUserWithEmailAndPassword(auth,singnupUserData.email,singnupUserData.password)
        .then((userConditnal)=>{           
            const {uid} = userConditnal.user;
            writeUserData(uid,singnupUserData.name,singnupUserData.email,singnupUserData.mobile,singnupUserData.address)
        })
        .catch((error)=>{
            console.log(error)
        })
}

function writeUserData(userId, name,email ,mobile, address) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      mobile: mobile,
      address : address
    });
}