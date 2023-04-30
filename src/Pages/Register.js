import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomInput } from '../Components/CustomInput';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Components/Firebase/firebaseConfig';


export const Register = () => {
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
        e.preventDefault();
        const { confirmPassword, password, email } = formData;
        if (confirmPassword !== password) {
            toast.error('Password do not match');
            return;
        }

        try {
            const pendingState = await createUserWithEmailAndPassword(auth, email, password);

            console.log(pendingState);
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
