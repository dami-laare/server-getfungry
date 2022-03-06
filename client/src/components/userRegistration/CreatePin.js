import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { useAlert } from 'react-alert'
import Header from '../UI/Header'
import ReactCodeInput from 'react-code-input'
import Button from '../UI/Button'
import { addPin } from '../../actions/userActions';



const CreatePin = ({style}) => {

    const [pin, setPin] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useStore();
    const alert = useAlert();

    const pinChangeHandler = (pin) => {
        setPin(pin)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let state = store.getState();
        console.log(pin)

        await dispatch(addPin(pin, state.token))

        state = store.getState();


        if(state.error) {
            return alert.error(state.error)
          }
    }
  return (
    <Fragment >
        {/* <Header imgSrc='logo-white.png' classes={'nav-custom'}/> */}
        <section className='mt-custom my-auto text-center d-flex flex-column justify-content-center align-items-center'>
            <p className='px-3 mb-4'>Create your PIN.</p>
            <form className='row' onSubmit={submitHandler}>
                <div className='mb-4 col-12'>
                    <ReactCodeInput 
                        type='text'
                        fields={6}
                        onChange={pinChangeHandler}
                        inputStyle={style}
                        className='pin'
                    />
                </div>
                <div className='col-6 mx-auto'>

                    <Button btnText='Verify' />
                </div>
            </form>
        </section>

        
    </Fragment>
  )
}

export default CreatePin