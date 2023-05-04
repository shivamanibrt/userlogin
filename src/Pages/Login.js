import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomInput } from '../Components/CustomInput'
import { loginUser } from '../Redux/loginUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        user?.uid && navigate("dashboard");
    }, [user?.uid, navigate]);

    const handelOnchange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handelOnsumbit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    }

    const inputField = [{

        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'johndoe@email.com'
    },
    {
        label: 'Password',
        name: 'password',
        placeholder: '******',
        type: 'password',
        required: true
    },
    ]

    return (
        <div className='form-holder'>

            <Form onSubmit={handelOnsumbit} className=' shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
                <h3>Welcome to Money Management!</h3>
                {
                    inputField.map((item, i) =>
                        <CustomInput {...item} key={i} onChange={handelOnchange} />
                    )
                }

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
