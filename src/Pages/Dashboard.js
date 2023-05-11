import React from 'react'
import { TransForm } from '../Components/Transation/TransForm';
import { TransTable } from '../Components/Transation/TransTable';


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
