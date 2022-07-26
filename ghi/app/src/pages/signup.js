import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            errors:"",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('http:localhost:8080/api/signup/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });

            try {
                const authResponse = await fetch('http:localhost:8080/api/token/', {
                    method: 'POST',
                    body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                    })
                });
                const data = authResponse.data
                let h =  {
                    'Authorization': "JWT " + data.access,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
                
                
                localStorage.setItem('authTokens', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                this.setState({
                    username: '',
                    password: ''
                })

                return window.location.href = '/';
            } catch (error) {
                alert(error.authResponse.data['detail'])
                throw error;
            }

        } catch (error) {
            alert(error.response.data['detail'])
            throw error;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h2>Signup</h2>
                        <form onSubmit={this.handleSubmit}>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control" onChange={this.handleChange}
                                    required type="text" id="username" placeholder="username"
                                    name="username" value={this.state.username}
                                    minLength={5}
                                    maxLength={15}
                                />
                                <label htmlFor="username">Username</label>
                                <p>{ this.state.errors.username ? this.state.errors.username : null}</p>    
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control" onChange={this.handleChange}
                                    required type="email" id="email" placeholder="email"
                                    name="email" value={this.state.email}
                                />
                                <label htmlFor="email">Email</label>
                                <p>{ this.state.errors.email ? this.state.errors.email : null}</p>    
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control" onChange={this.handleChange}
                                    required type="password" id="password" placeholder="password"
                                    name="password" value={this.state.password}
                                    minLength={8}
                                    maxLength={25}
                                />
                                <p>{ this.state.errors.password ? this.state.errors.password : null}</p>
                                <label htmlFor="password">Password</label>
                            </div>

                            <div>
                                <button className="btn btn-primary">Signup</button>
                            </div>
                            <div className="mt-2">
                                <p className="forgot-password text-right">
                                    Already registered? <a href="/login">Sign in</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
export default Signup;
