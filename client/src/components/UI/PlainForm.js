import React from 'react'

const PlainForm = ({type, name, placeholder, btnSize, btnText, classes, onSubmit, onClick}) => {

  return (
    <form className={`row mx-auto ${classes ? classes : ''}`} onSubmit={onSubmit}>
        <div className={` mb-4`}>
            <input 
                className='form-control' 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                // onChange={codeChangeHandler}
                required
            />
        </div>
        <div className={`col-${btnSize} text-center mb-2`}>
            <button className='btn w-100 rounded-pill mx-auto' type='submit'>{btnText}</button>
        </div>
        <div className='col-12 row text-center justify-content-center mt-2'>
            <div className='col-6'>
                <button onClick={onClick} className=' btn btn-back w-100 rounded-pill mx-auto' type='submit'>Close</button>
            </div>

        </div>
    </form>
  )
}

export default PlainForm