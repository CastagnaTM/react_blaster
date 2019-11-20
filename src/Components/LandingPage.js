import React, { Component } from 'react'


export default class LandingContainer extends Component{

    state = {
        LoginName: '',
        LoginPassword: '',
        SignupName: '',
        SignupPassword: '',
        passwordConfirmation: '',
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleLogin = (event) => {
        event.preventDefault()
        fetch('http://localHost:3000/login',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': "application/json"
            },
            body: JSON.stringify({
                name: this.state.LoginName,
                password: this.state.LoginPassword
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.errors){
              alert(data.errors)
            } else {
              this.props.setUser(data.user)
            }
            this.setState({
                LoginName: '',
                LoginPassword: ''
              })
        })
    }

    handleSignup = (event) => {
        event.preventDefault()
        if(this.state.SignupPassword === this.state.passwordConfirmation){
            fetch('http://localhost:3000/signup',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    name: this.state.SignupName,
                    password: this.state.passwordConfirmation
                  })
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.errors){
                    alert(data.errors)
                  } else {
                this.props.setUser(data.user)
                }
            })
        } else {
            alert('Password and Confirmation did not match.')
            }
    }
    


    render(){
        return(
            <div>
               <div className='home-screen-header'>
                    <h4>Please Login</h4>
                </div>
                <div>
                    <form className="form" onSubmit={this.handleLogin}>
                        <input name="LoginName" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
                        <input name="LoginPassword" value={this.state.password} onChange={this.handleChange} placeholder="Password" type="password"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className='home-screen-header'>
                    <h5>Or Signup!</h5>
                </div>
                <div>
                    <form className="form" onSubmit={this.handleSignup}>
                        <input name="SignupName" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
                        <input name="SignupPassword" value={this.state.password} onChange={this.handleChange} placeholder="Password" type="password"/>
                        <input name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} placeholder="Password Confirmation" type="password"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


}