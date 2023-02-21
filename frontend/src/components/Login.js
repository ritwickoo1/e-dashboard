import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
const Login = () => {
    const Navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            Navigate("/");
        }
    }, []);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleLogin = async () => {
        console.warn(email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });
        result = await result.json();
        console.warn("result", result);
        if(!result.auth){
            alert("Invalid Login");
        }else{
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.token));
            Navigate("/");
        }
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <input className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)}
                type="text" placeholder="Enter Email" />
            <input className="inputBox" value={password} onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder="Enter Password" />
            <button onClick={handleLogin} className="btn">Login</button>
        </div>
    );
}

export default Login;
