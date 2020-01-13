import React, { Component } from 'react'
import BossIntro from './BossIntro'

let highscores;

export default class LevelEnd extends Component {

    state = {
        gameEnd: false,
        highscores: null,
        name: '',
        score: null,
        showBossIntro: false,
        currentWinner: null,
        scoresIndex: 0,
        showForm: true
    }

    componentDidMount = () => {
        
        if(this.props.success){
            this.setCurrentScore()
            this.getHighscores()
        }
    }

    handleReturn = (newGame) => {
        if(newGame === true){
            this.props.stopMusic()
        }
        this.props.levelComplete(this.props.success, this.props.levelPoints, this.props.health, newGame === false ? false : true)
    }

    handleBossIntro = () => {
        this.setState({
            showBossIntro: true
        })
    }

    displayHighscores = () => {
        let index = this.state.scoresIndex;
        let allHighscores = this.state.highscores
        if(this.state.currentWinner !== null && !allHighscores.includes(this.state.currentWinner)){
            allHighscores.push(this.state.currentWinner)
        }
        allHighscores.sort((a,b) => a.score < b.score ? 1 : -1)
        highscores = allHighscores.slice(index,index+5)
        return( highscores.map(score => <li key={score.id} className='text' style={{marginLeft: '34%', padding: '1%'}}>{score.name} . . . {score.score}</li>) )
    }

    setCurrentScore = () => {
        this.setState({
            score: this.props.levelPoints + this.props.totalPoints
        })
    }

    getHighscores = () => {
        fetch('https://react-blaster-backend.herokuapp.com/users')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                highscores: data.sort((a,b) => a.score < b.score ? 1 : -1)
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
        fetch('https://react-blaster-backend.herokuapp.com/highscore',{
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
            showForm: false,
            name: this.state.name,
            score: this.state.score,
            currentWinner: {name: this.state.name, score: this.state.score}
        })
    }

    moreScores = () => {
        //some sort of conditional to check the length of the scores array
        if(this.state.highscores[this.state.scoresIndex + 5]){
            this.setState({
                scoresIndex: this.state.scoresIndex + 5
            })
        }
        else{
            this.setState({
                scoresIndex: 0
            }) 
        }
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
                    <div className='level-end-grid'>
                        <div>
                            <p className='level-end-text'>
                                {this.props.success ? `Congrats! You Scored ${this.props.levelPoints} Points!` : 'Sorry, you lost this time around...'}
                            </p>
                            <p className='level-end-text'>
                            {this.props.gameComplete ? `You Beat The Game With ${this.state.score} Points!` : null}
                            </p>
                            <p className='level-end-text'>
                            {this.props.gameComplete ? `Enter Your Name Below:` : null}
                            </p>
                        </div>
                        <div>
                            <button style={{display: this.props.gameComplete ? 'none' : 'block'}}
                            className='hvr-ripple-out' 
                            onClick={this.props.levelName === 'Level Three' && this.props.success ? this.handleBossIntro : () => this.handleReturn(false)}>Continue
                            </button>
                            <button style={{display: this.props.gameComplete ? 'block' : 'none'}}
                            className='hvr-ripple-out' 
                            onClick={() => this.handleReturn(true)}>Play Again?
                            </button>
                        </div>
                    </div>
                    <div className='highscores-container' style={{display: this.props.gameComplete ? 'block' : 'none'}}>
                        <h4 className='text' style={{marginLeft: '40%'}}>High Scores</h4>
                        <form className="form" onSubmit={this.handleHighScores} style={{display: this.state.showForm ? 'block' : 'none'}}>
                            <input className="input" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name..." />
                            <button className='scores-button' type="submit">Submit</button>
                        </form>
                        <ul>
                            {this.state.highscores ? this.displayHighscores() : null}
                        </ul>
                        <button className='more-button' onClick={() => this.moreScores()}>More</button>
                    </div>
                </div>
            )
        }
    }
}