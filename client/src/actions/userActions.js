import axios from "axios";

export const submitInviteCode = (inviteCode) => async function(dispatch) {
    try{
        dispatch({
            type: 'LOADING'
        })

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/invite/validate/${inviteCode}`)


        dispatch({
            type: 'SUCCESS',
            payload: data.success
        })

    }catch(error) {
        dispatch({
            type: 'FAIL',
            payload: error.response.data.message
        })
    }
}

export const registerUser = (phone, name, email) => async function(dispatch) {
    try{
        dispatch({
            type: 'LOADING'
        })

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/user/register`, {
            phone,
            name,
            email
        })

        dispatch({
            type: 'SUCCESS',
            payload: {...data}
        })



    }catch(error) {
        dispatch({
            type: 'FAIL',
            payload: error.response.data.message
        })
    }
}

export const verifyOTP = (otp, token) => async function(dispatch) {
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`http://127.0.0.1:4000/api/v1/otp/verify`,{
            otp,
            token
        })

        dispatch({
            type: 'SUCCESS',
            payload: {...data, token}
        })

    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message, token}
        })
    }
}

export const addPin = (pin, token) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`http://127.0.0.1:4000/api/v1/user/pin/new`,{
            pin,
            token
        })

        dispatch({
            type: 'SUCCESS',
            payload: {...data, token}
        })

    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message, token}
        })
    }   
}
