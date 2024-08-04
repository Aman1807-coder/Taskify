import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const Signin = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [inputSignin, setInputSignin] = useState({
        email: "", password: ""
    });

    useEffect(() => {
        if (firebase.isLoggedIn) navigate('/');
    }, [firebase, navigate]);

    const handleInputSignin = (event) => {
        const { name, value } = event.target;
        setInputSignin((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            const res = await firebase.signinUserWithEmailAndPassword(inputSignin.email, inputSignin.password)

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <input type='email' name='email'
                placeholder='Enter Email' onChange={handleInputSignin} />
            <input type='password' name='password'
                placeholder='Enter Password' onChange={handleInputSignin} />
            <button onClick={handleSubmit}>Signin</button>
            <h4>OR</h4>
            <button onClick={firebase.signinWithGoogle}>Signin with Google</button>
        </div>
    )
}

export default Signin