import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../Components/Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { setTrans } from './transSlice';

export const postTransaction = data => async dispatch => {
    try {
        const docRefPending = addDoc(collection(db, 'transactions'), data);

        toast.promise(docRefPending, {
            pending: 'Please wait...'
        });
        const docRef = await docRefPending;

        if (docRef?.id) {
            dispatch(fetchTransaction(data.uid))
            toast.success('Transaction has been added succesfuly')
        }

    } catch (error) {
        toast.error(error.message)
    }
};

export const fetchTransaction = (uid) => async (dispatch) => {
    try {
        const q = query(collection(db, 'transactions'), where('userId', '==', uid));
        const querySnapShot = await getDocs(q);

        const data = [];
        querySnapShot.forEach((doc) => {
            const { id } = doc;
            const transaction = { ...doc.data(), id };
            data.push(transaction);
        });

        dispatch(setTrans(data));
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
};
