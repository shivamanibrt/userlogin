import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify";
import { setUser } from "./userSlice";

export const autoLogin = async uid => {
    try {

        //get user from firestore
        const userResp = await getDoc(doc(db, 'users', uid));
        const userInfo = { ...userResp.data(), uid: uid };

        //mount user to redux
        dispatch(setUser(userInfo));

    } catch (error) {
        toast.error(error.message)
    }
}
export const loginUser = async () => {
    try {
        const { user } = await signInWithEmailAndPassword(
            user,
            email,
            password
        )
        user?.uid && dispatch(autoLogin(user.uid))
    } catch (error) {
        toast.error(error.message);
    }
}