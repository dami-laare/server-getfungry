import React from 'react'

const Home = () => {
  return (
    <section className='mt-5 mx-4 hero-main d-flex flex-column'>
        <div className='row h-25 justify-content-between my-5'>
            <div className='col-6 mt-3'>
                <h1 id='hero-header'>Eat Now, Pay Later!</h1>
                <p id='hero-text'>There are smarter ways to spend your money.</p>
            </div>
            <div className='col-6'>
                <img className='hero-image' src='burger.png' alt='Home burger' />
            </div>
        </div>
        <div className='d-flex flex-column text-center '>
            <p className='mb-5'>Get credits to cover your food expenses and pay us at the end of the month.</p>
            <form className='row mx-auto'>
                <div className='col-8'>
                    <input id='invite-code' className='form-control' type={'text'} name='inviteCode' placeholder='Enter your invite code'/>
                </div>
                <div className='col-4'>
                    <button className='btn w-75 rounded-pill' type='submit'>Go</button>
                </div>
            </form>
        </div>
        <footer className='hero-foot text-center mt-auto mb-3 '>Payments secured by Monnify</footer>
    </section>
  )
}

export default Home