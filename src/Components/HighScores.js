import React, { Component } from 'react'


export default class HighScores extends Component{

    state = {
        name: '',
        score: null,
        highscores: null
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleHighScores = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/highscore',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                score: this.state.score
                })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors){
                alert(data.errors)
                } else {
                    //something to add that new data
            this.props.setUser(data.user)
            }
        })
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