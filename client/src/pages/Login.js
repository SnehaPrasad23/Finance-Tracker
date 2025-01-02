import React, { useState, useEffect } from 'react'
import 'antd/dist/reset.css'; // For Ant Design v5+
import { Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from "axios";


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    //form submit
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            //saving data returned in local storage
            const { data } = await axios.post('/api/v1/users/login', values)
            setLoading(false);
            message.success('Login Successful');
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }))
            navigate('/')
        } catch (error) {
            setLoading(false);
            message.error('Soething went wrong');
        }
    }

    //prevent for logged in user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="register-page-container">
            <h1>Budget Buddy</h1>
            <div className="register-page">
                {loading && <Spinner />}
                <Form layout="vertical" onFinish={submitHandler}>
                    <h1>Login</h1>
                    <Form.Item label="Email" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className="d-flex justify-content-between">
                        <Link to="/register">Not a user? Register Here</Link>
                        <button className='btn btn-primary' style={{margin:'5px'}}>Login</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login