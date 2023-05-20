import { useState } from 'react';
import {auth, googleProvider} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth'


export const Auth = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const logout =async()=> {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    const signInWithGoogle = async() => {

        try {
            await signInWithPopup(auth,googleProvider);
        } catch (error) {
            console.log(error);
        }
    }

   
    
    const signIn = async() => {

        try {
            await createUserWithEmailAndPassword(auth,email,password);
        } catch (error) {
            console.log(error);
        }
       
    }
    return (
        <div>
            <input placeholder="Email..." 
            type='email'
            value = {email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type='password'
            />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign in with Google</button>

            <button onClick={logout}>LogOut</button>
        </div>
    )
}