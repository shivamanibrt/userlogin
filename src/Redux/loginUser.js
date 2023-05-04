import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify";
import { auth, db } from "../Components/Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from './userSlice'

export const autoLogin = uid => async dispatch => {
    try {

        //get user from firestore serve
        const userResp = await getDoc(doc(db, 'users', uid))
        const userInfo = { ...userResp.data(), uid: uid };
        console.log(userInfo);

        //mount user to redux
        dispatch(setUser(userInfo));

    } catch (error) {
        toast.error(error.message)
    }
}

export const loginUser = ({ email, password }) => async dispatch => {
    try {
        const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        // if (user?.uid) {
        //     //get user from firestore serve
        //     const userResp = await getDoc(doc(db, 'users', user?.uid))
        //     const userInfo = { ...userResp.data(), uid: user?.uid };
        //     console.log(userInfo);

        //     //mount user to redux
        //     dispatch(setUser(userInfo));
        // }
        user?.uid && dispatch(autoLogin(user.uid))

    } catch (error) {
        toast.error(error.message);
    }
}