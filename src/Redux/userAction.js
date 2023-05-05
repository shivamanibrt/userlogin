import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../Components/Firebase/firebaseConfig';
import { toast } from 'react-toastify';

export const postTransaction = async data => {
    try {
        const docRefPending = addDoc(collection(db, 'transactions'), data);

        toast.promise(docRefPending, {
            pending: 'Please wait...'
        });
        const docRef = await docRefPending;

        if (docRef?.id) {
            toast.success('Transaction has been added succesfuly')
        }

    } catch (error) {
        toast.error(error.message)
    }
};