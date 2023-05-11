import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomInput } from '../Components/CustomInput';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Components/Firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setError('');
            value.length < 6 && setError('Password is too short');
            !/[0-9]/.test(value) && setError('Password must include Number');
            !/[A-Z]/.test(value) && setError('Password must include Capital letter');
            !/[a-z]/.test(value) && setError('Password must include Small letter');
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e) => {

        try {
            e.preventDefault();
            const { confirmPassword, password, email } = formData;
            if (confirmPassword !== password) {
                toast.error('Password do not match');
                return;
            }

            const pendingState = createUserWithEmailAndPassword(auth, email, password);

            toast.promise(pendingState,
                {
                    pending: 'Please wait'
                }
            )
            const { user } = await pendingState;
            if (user?.uid) {
                toast.success('user has been registered');
                //user is registered not lets add them to database for future post

                const userObj = {
                    fName: formData.fName,
                    lName: formData.lName,
                    email: formData.email
                }
                //send user to database 
                await setDoc(doc(db, 'users', user.uid), userObj);
                toast.success('User has been registered now you may login');

            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const inputFields = [
        {
            label: 'First Name',
            name: 'fName',
            placeholder: 'John',
        },
        {
            label: 'Last Name',
            name: 'lName',
            placeholder: 'Doe',
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'johndoe@email.com',
        },
        {
            label: 'Password',
            name: 'password',
            placeholder: '******',
            type: 'password',
            required: true,
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            placeholder: '******',
            type: 'password',
            required: true,
        },
    ];

    return (
        <div className="form-holder">
            <Form onSubmit={handleOnSubmit} className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <h3>Welcome!</h3>
                {inputFields.map((item, i) => (
                    <CustomInput key={i} onChange={handleOnChange} {...item} />
                ))}
                <div className="p-3 mb-4">
                    Password should be longer than 6 characters and contain at least 1 capital and small letter.
                    <Form.Text>{error && <ul><li className="text-danger">{error}</li></ul>}</Form.Text>
                </div>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    );
};
