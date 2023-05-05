import React from 'react'
import { TransForm } from '../Transation/TransForm';
import { TransTable } from '../Transation/TransTable';

const Dashboard = () => {

    return (
        <div>
            <div className="">
                <TransForm />
            </div>
            <div className="">
                <TransTable />
            </div>
        </div>
    )
}
export default Dashboard;
