import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../Firebase/firebaseConfig"

//pull data from firebase and add to the redux store for the specific user based on the uid
export const getTransaction = (userId) => async (dispatch) => {
    try {

        const q = query(collection(db, 'transaction'), where('userId', '==', userId));

        const transListSnapshot = await getDocs(q);

        console.log(transListSnapshot)
    } catch (error) {
        toast.error(error.message)
    }

}

//adding ata to the frirebase db
export const addTransactionAction = (data) => async (dispatch) => {
    try {
        const responsePending = addDoc(collection(db, 'transaction'), data);
        toast.promise(responsePending, {
            pending: 'Please wait...',
        });
        const result = await responsePending;
        if (result?.id) {
            toast.success('New transaction has been added');
            //get all transaciton
            dispatch(getTransaction(data.userId))

        }
    } catch (error) {
        toast.error(error.message)
    }
}