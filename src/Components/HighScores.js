import React, { Component } from 'react'


export default class HighScores extends Component{

    state = {
        gameEnd: false,
        highscores: null,
        name: '',
        score: null,
        show: false,
        showBossIntro: false,
        currentWinner: null,
        showForm: false
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    getHighscores = () => {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                highscores: data.sort((a,b) => a.score < b.score ? 1 : -1)
            })
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
            }
        })
        this.setState({
            show: true,
            name: this.state.name,
            score: this.state.score,
            currentWinner: {name: this.state.name, score: this.state.score}
        })
    }

    render(){
        return(
            <div>
              <h4 className='text' style={{marginLeft: '40%'}}>High Scores</h4>
                        <form className="form" onSubmit={this.handleHighScores} style={{display: this.state.showForm ? 'block' : 'none'}}>
                            <input className="input" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name..." />
                            <button className='scores-button' type="submit">Submit</button>
                        </form>
                        <ul>
                            {this.state.highscores ? this.displayHighscores() : null}
                        </ul>
            </div>
        )
    }
}