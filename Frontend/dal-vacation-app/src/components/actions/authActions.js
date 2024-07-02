import axios from 'axios';

export const signup = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('https://z5vur06rqi.execute-api.us-east-1.amazonaws.com/DalVacation/auth/storeUserDetails', credentials);
        console.log(response.data);
        dispatch({ type: 'SIGNUP', payload: response.data})
    }
    catch (error) {
        dispatch({ type: 'FAILURE', payload: error.message });
    }
}

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('https://z5vur06rqi.execute-api.us-east-1.amazonaws.com/DalVacation/auth/storeUserDetails', credentials);
        dispatch({ type: 'LOGIN', payload: response.data})
    }
    catch (error) {
        dispatch({ type: 'FAILURE', payload: error.message });
    }
}

export const logout = () => {
    return { type: 'LOGOUT' }
}