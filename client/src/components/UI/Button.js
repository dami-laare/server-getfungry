import React from 'react'

const Button = ({btnText}) => {
  return (
    <button className='btn w-75 rounded-pill' type='submit'>{btnText}</button>
  )
}

export default Button