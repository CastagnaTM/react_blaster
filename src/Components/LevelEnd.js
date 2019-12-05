import React, { Component } from 'react'
import BossIntro from './BossIntro'

let highscores;

export default class LevelEnd extends Component {

    state = {
        gameEnd: false,
        highscores: null,
        name: '',
        score: null,
        show: false,
        showBossIntro: false
    }

    componentDidMount = () => {
        
        if(this.props.success){
            this.setCurrentScore()
            this.getHighscores()
        }
        
    }

    handleReturn = () => {
        this.props.levelComplete(this.props.success, this.props.levelPoints, this.props.health)
    }
    handleBossIntro = () => {
        this.setState({
            showBossIntro: true
        })

    }

    displayHighscores = () => { 
        let allHighscores = this.state.highscores.sort((a,b) => a.score < b.score ? 1 : -1)
        highscores = allHighscores.slice(0,5)
        return( highscores.map(score => <li className='text' style={{marginLeft: '34%', padding: '1%'}}>{score.name} . . . {score.score}</li>) )
    }

    setCurrentScore = () => {
        this.setState({
            score: this.props.levelPoints + this.props.totalPoints
        })
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
            score: this.state.score 
        })
    }

    render(){
        if(this.state.showBossIntro === true){
            return(
                <BossIntro
                    health={this.props.health} 
                    success={this.props.success}
                    levelPoints={this.props.levelPoints}
                    levelComplete={this.props.levelComplete}
                    handleReturn={this.handleReturn} 
                />
            )
        }
        else{
            return(
                <div className='level-end-container'>
                    <div className='level-end-grid' style={{display: this.props.scoresView ? 'none' : 'block'}}>
                        <div>
                            <p className='text' style={{textAlign: 'center'}}>
                                {this.props.success ? `Congrats! You Scored ${this.props.levelPoints} Points!` : 'Sorry, you lost this time around...'}
                            </p>
                            <p className='text'>
                            {this.props.gameComplete ? `You Beat The Game With ${this.state.score} Points! Enter Your Name Below:` : null}
                            </p>
                        </div>
                        <div>
                            <button style={{display: this.props.gameComplete ? 'none' : 'block'}}
                            className='hvr-ripple-out' 
                            onClick={this.props.levelName === 'Level Three' ? this.handleBossIntro : this.handleReturn}>Continue</button>
                        </div>
                    </div>
                    <div className='highscores-container' style={{display: this.props.gameComplete ? 'block' : 'none'}}>
                        <h4 className='text' style={{marginLeft: '40%'}}>High Scores</h4>
                        <form className="form" onSubmit={this.handleHighScores}>
                            <input className="input" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name..." />
                            <button className='scores-button' type="submit">Submit</button>
                        </form>
                        <ul>
                            <li className='text' style={{marginLeft: '34%', padding: '1%', display: this.state.show ? 'list-item' : 'none'}}> {this.state.name} ... {this.state.score}</li>
                            {this.state.highscores ? this.displayHighscores() : null}
                        </ul>
                    </div>
                </div>
            )
        }
    }
}