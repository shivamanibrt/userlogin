import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify";
import { auth, db } from "../Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from './userSlice'

export const autoLogin = uid => async dispatch => {
    try {
        //get user from firestore serve
        const userResp = await getDoc(doc(db, 'users', uid))
        //adding data and uid to user info to send to redux 

        const userInfo = { ...userResp.data(), uid: uid };
        // console.log(userInfo);

        //mount user to redux
        dispatch(setUser(userInfo));

    } catch (error) {
        toast.error(error.message)
    }
}
export const loginUser = ({ email, password }) => async dispatch => {
    try {
        //authentication from firebase 
        const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        user?.uid && dispatch(autoLogin(user.uid))

    } catch (error) {
        toast.error(error.message);
    }
}