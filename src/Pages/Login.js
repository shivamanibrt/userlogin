import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomInput } from '../Components/CustomInput'

export const Login = () => {
\

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

        <Form className=' shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
            <h3>Welcome to Money Management!</h3>
            {
                inputField.map((item, i) =>
                    <CustomInput {...item} key={i} />
                )
            }

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
)
}
