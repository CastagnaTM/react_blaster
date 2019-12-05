import React, { Component } from 'react'

export default class LevelEnd extends Component {

    state = {
        gameEnd: false,
        highscores: null,
        name: '',
        score: null
    }

    componentDidMount = () => {
       this.getHighscores()
    }

    handleReturn = () => {
        this.props.levelComplete(this.props.success, this.props.levelPoints, this.props.health)
    }

    displayHighscores = () => { 
        let highscores = this.state.highscores.sort((a,b) => a.score > b.score ? 1 : -1)
     return( highscores.map(score => <li>{score.user} . . . {score.score}</li>) )
    }

    getHighscores = () => {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                highscores: data
            })
        })
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
                score: this.state.score // replace this by passing down total score
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
            <div className='level-end-container'>
                <div className='level-end-grid'>
                    <div>
                        <p style={{color:'whitesmoke', textAlign: 'center'}}>
                            {this.props.success ? `Congrats! You Scored ${this.props.levelPoints} Points!` : 'Sorry, you lost this time around...'}
                        </p>
                    </div>
                    <div>
                        <button className='hvr-ripple-out' onClick={this.handleReturn}>Return</button>
                    </div>
                </div>
                <div className='highscores-container' style={{display: this.props.success ? 'block' : 'none'}}>
                <form className="form" onSubmit={this.handleHighScores}>
                        <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name..." />
                        <button type="submit">Submit</button>
                    </form>
                    {this.state.highscores ? this.displayHighscores() : null}
                </div>
            </div>
        )
    }

}