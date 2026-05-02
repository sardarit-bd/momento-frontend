function isPasswordValid(password) {

    /********** return true or false is the password is less then 6 charectar ************/
    return typeof password === 'string' && password.length > 6;
}


export default isPasswordValid;