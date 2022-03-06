import React from 'react'

const MealTicket = () => {
  return (
    <div className='meal-ticket col-12 row justify-content-center text-center mt-4'>
        <div className='col-3 mx-3 '>
            <button className='meal-btn btn'><i className="text-danger fas meal-arrow fa-arrow-down"></i></button>
            <p className='mt-2'>Get Food Voucher</p>
        </div>
        <div className='col-3 mx-3'>
            <button className='meal-btn btn'><i className="text-success fas meal-arrow fa-arrow-up"></i></button>
            <p className='mt-2'>Pay back</p>
        </div>
    </div>
  )
}

export default MealTicket


