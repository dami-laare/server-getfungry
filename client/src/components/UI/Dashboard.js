import React, { Fragment } from 'react'
import BottomMenu from './BottomMenu'
import CreditBalance from './CreditBalance'
import Header from './Header'
import MealTicket from './MealTicket'
import Transactions from './Transactions'

const Dashboard = () => {
  return (
    <Fragment>
        <Header imgSrc={'logo.png'} style={{width: '5rem', 'margin-left': '1.5rem'}} heading='Dashboard' classes={'dashboard-header'}/>
  
        <div className='d-flex flex-column'style={{'margin-top': '7rem', width: '90%'}}>
            <CreditBalance />
            <MealTicket />
            <Transactions />
            <BottomMenu />
        </div>
    </Fragment>
  )
}

export default Dashboard