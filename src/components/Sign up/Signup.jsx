import React from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css"
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useState } from 'react';


const auth=getAuth(app)

const Signup = () => {
    const[error, setError]=useState('');
    // const [confirm, setConfirm]=useState('');

    const handSignUp=(event)=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        const confirm=form.confirm.value;
        console.log(email, password, confirm);

        if(password !== confirm ){
            setError("password didn't match");
            return;
        }
        if(password.length<6){
            setError("password must be at least 6 characters");
            return;
        }
        // else if(password==confirm){
        //     setConfirm("You have successfully login")
        // }
        // else{
        //     setError('')
        // }
        event.target.reset()
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold">Please Sign Up!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" name="email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required/>
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Confirm password" name="confirm" className="input input-bordered" required/>
                            <label className="label">
                                <a href="#" className="label-text-alt  ">Already have an account? <span className='link link-hover underline text-blue-800 text-bold text-sm'><Link to='/login'>Login</Link></span></a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                            <p className='text-danger'>{error}</p>
                            {/* <p className='text-success'>{confirm}</p> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;