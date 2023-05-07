import React from 'react'
import { Button, Table } from 'react-bootstrap'

//1. fetch all transaction from the database
//2. put all the trans to the redux store
//3. get all the trans from the redux store into the table and display

export const TransTable = () => {
    return (
        <div className='mt-5 '>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Shopping</td>
                        <td>200</td>
                        <td>1/10/2022</td>
                        <td>
                            <Button variant='danger'>
                                <i className='fa-sharp fa-solid fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

        </div >
    )
}
