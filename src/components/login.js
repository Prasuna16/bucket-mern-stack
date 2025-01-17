import Axios from 'axios';
import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import Header from './header';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            submitted: false,
            credentials: false,
            id: null,
            name: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleMail = this.handleMail.bind(this);
    }
    handleMail(e) {
        this.setState({
            email: e.target.value,
        })
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value,
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        Axios.get('http://localhost:8080/getusers/')
            .then(res => {
                var users = res.data;
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email === this.state.email && users[i].password === this.state.password) {
                        this.setState({
                            credentials: true,
                            name: users[i].name,
                            id: users[i]._id,
                        })
                        break;
                    }
                }
            })
        this.setState({
            submitted: true,
        })
    }
    render() {
        if (this.state.submitted && this.state.credentials) {
            return (
                <Redirect to= {"/todos/" + this.state.id} />
            )
        }
        const error = <center><div style={{color: "red", fontFamily: "Helvetica"}}>Incorrect credentials.</div></center>
        return (
            <div>
                {(this.state.submitted && this.state.credentials) ? <Header name={this.state.name} email={this.state.email} /> : <Header />}
                {(this.state.submitted && !this.state.credentials) && error}
                <form className="box">
                    <h1>Login</h1>
                    <input type="email" name="" placeholder="Email" onChange={this.handleMail} />
                    <input type="password" name="" placeholder="Password" onChange={this.handlePassword} />
                    <button type="submit" name="" onClick={this.handleSubmit} className="bttn" >Login</button>
                    <p>Don't have account yet? <Link to="/signup">Create Account</Link></p>
                </form>
            </div>
        )
    }
}

export default Login