import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { useAlert } from 'react-alert'
import { verifyOTP } from '../../actions/userActions';
import BottomMenu from './BottomMenu'
import CreditBalance from './CreditBalance'
import Header from './Header'
import MealTicket from './MealTicket'
import DModal from '../UI/DModal'
import Transactions from './Transactions'
import PlainForm from './PlainForm'
import './Dashboard.css'

const Dashboard = () => {

    const navigate = useNavigate();
    const alert = useAlert();
    const store = useStore();
    const dispatch = useDispatch();

    const [show, setShow] = useState(true)

    const modalBtnClickHandler = () => {
        // setShow(false)
        console.log(store.getState());

    }

    const submitHandler = (e) => {
        e.preventDefault()
        // setShow(false)
        console.log(store.getState());

        let currState = store.getState();
    }
  return (
    <Fragment>
        <Header image={true} imgSrc={'logo.png'} style={{width: '5rem', marginLeft: '1.5rem'}} heading='Dashboard' classes={'dashboard-header'}/>
  
        <div className='d-flex flex-column'style={{marginTop: '7rem', width: '100%'}}>
            <div style={{padding: '1rem'}}>
                <CreditBalance />
                <MealTicket />
                <Transactions />
            </div>
            
            <BottomMenu />
            <DModal 
                show={show} 
                modalBody={<PlainForm type='text' name='bvn' placeholder='Enter your BVN' btnText={'Continue'} btnSize='5' classes={'justify-content-center'} onSubmit={submitHandler} onClick={modalBtnClickHandler}/>}
                headerText={'Activate your account'}
                onClick={modalBtnClickHandler}
                footer={false}
            />
        </div>
    </Fragment>
  )
}

export default Dashboard