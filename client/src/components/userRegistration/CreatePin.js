import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { Modal } from 'react-bootstrap'
import { useAlert } from 'react-alert'
import Header from '../UI/Header'
import ReactCodeInput from 'react-code-input'
import Button from '../UI/Button'
import { addPin } from '../../actions/userActions';



const CreatePin = ({style, test}) => {

    const [pin, setPin] = useState('');
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useStore();
    const alert = useAlert();

    const pinChangeHandler = (pin) => {
        setPin(pin)
    }

    const modalBtnClickHandler = () => {
        setShow(false)
        
        navigate('/')
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let state = store.getState();
        console.log(pin)

        await dispatch(addPin(pin, state.token))

        state = store.getState();

        setShow(true)

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
                        type='password'
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

        <Modal show={test} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Congrats!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>An email has been sent to you with instructions on how to redeem your voucher.</p>
            </Modal.Body>
            <Modal.Footer className='row'>
                <div className='col-5'>
                    <Button btnText='Got It!' onClick={modalBtnClickHandler}/>
                </div>
            </Modal.Footer>
        </Modal>
    </Fragment>
  )
}

export default CreatePin