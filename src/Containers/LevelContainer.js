import React, { Component } from 'react';
import Targets from '../Components/Targets'
import LevelEnd from '../Components/LevelEnd'
import FlipMove from 'react-flip-move'
import LevelOneSong from '../Assets/Audio/standIn.mp3'
import friendlySmall from '../Assets/FriendlySmall.png'
import friendlyStrike from '../Assets/FriendlyStrike.png'
import healthFull from '../Assets/HealthFull.png'
import health3 from '../Assets/Health3.png'
import health2 from '../Assets/Health2.png'
import health1 from '../Assets/Health1.png'
import healthEmpty from '../Assets/HealthEmpty.png'
let music = new Audio(LevelOneSong)
let health = healthFull;


export default class LevelContainer extends Component{

    //refactor later to use a switch statement to run through these functions based on which level is selected

    state = {
        selectedLevel: this.props.selectedLevel, //this should hold all info the container needs to render this level
        health: this.props.health,
        targets: null,
        counter: 0,
        isClicked: false,
        levelPoints: 0,
        success: false,
        levelEnd: false,
        firendlyBackgroundColor: '#18FCFF',
        debrisBackgroundColor: '#0B162A',
        hitFriendlyCount: 0
    }

    //loads everything and holds setInterval loops
    componentDidMount = () => {
        this.runGame()    
    }

    //function for handling target clicks
    handleClick = (name, target_type) => {
        //finds the target that was clicked
        let thisTarget = this.state.targets.find(target => target.name === name)
        thisTarget.isClicked = true
        //conditional for responding to target type
        if(target_type === 'debris'){
            this.setState({
                isClicked: true,
                levelPoints: this.state.levelPoints+1
            })
        }
        if(target_type === 'friendly'){
            this.setState({
                isClicked: true,
                levelPoints: this.state.levelPoints-2,
                hitFriendlyCount: this.state.hitFriendlyCount+1
            })
        }
        if(target_type === 'bomb'){
            this.setState({
                isClicked: true,
                health: this.state.health-1
            })
            console.log(this.state.health)
        }
    }

    // resets the state for targets, used for setInterval loop
    resetTargets = () => {
        let targetsCopy = [...this.state.targets];
        for(const target of targetsCopy){
            target.isClicked = false
        }
    }
    //translates targetString into objects
    establishTargets = (string) => {
        
        let targets = [];
        let targetArray = string.split('');
        for (let i = 0; i < targetArray.length; i++){
            if(targetArray[i] === '0'){
                targets.push({name: i, target_type: 'debris', isClicked: false})
            }
            else if(targetArray[i] === '1'){
                targets.push({name: i, target_type: 'friendly', isClicked: false})
            }
            else if(targetArray[i] === '2'){
                targets.push({name: i, target_type: 'bomb', isClicked: false})
            }
        }
        this.setState({
            targets: targets
        })
    }
  
    //load the targets
    loadLevelGrid = () => {
        this.setState({
            targets: this.shuffleGrid(this.state.targets)
        })
    }

    //shuffles the targets for loading
    shuffleGrid = (array) => {
        let currentIndex = array.length, temp, random;
        while(0 !== currentIndex){
            random = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temp = array[currentIndex];
            array[currentIndex] = array[random];
            array[random] = temp;
        }
        return array
    }

    // passes the targets to the Target component
    renderTargets = () => {
        return <FlipMove
        staggerDelayBy={100}
        appearAnimation="elevator"
        enterAnimation="fade"
        leaveAnimation="fade"
        >
        {this.state.targets.map(target => <Targets 
        handleClick={this.handleClick} key={target.name}{...target}
        friendlyBackgroundColor={this.state.friendlyBackgroundColor}
        debrisBackgroundColor={this.state.debrisBackgroundColor}
        />)}
        </FlipMove>
    }
    playMusic = () => {
        music.play();
    }

    stopMusic = () => {
        music.pause();
        music.currentTime = 0.0;
    }

    getHealth = () => {
        if(this.state.health === 4){
            return healthFull;
        }
        else if (this.state.health === 3){
            return health3;
        }
        else if(this.state.health === 2){
            return health2;
        }
        else if (this.state.health === 1){
            return health1;
        }
        else{
            return healthEmpty;
        }
    }

    runGame = () => {
        //translate targets function
        if (this.state.targets === null){
            this.establishTargets(this.state.selectedLevel.targetString)
        }
        this.playMusic();
        var gameLoop = setInterval(() =>{
            this.resetTargets()
            this.loadLevelGrid()
            this.setState({
                counter: this.state.counter+1
            })
            //conditions for level ending
            if(this.state.counter === 16 ){ //add condition for winning: a certain number of points needed per level
                clearInterval(gameLoop)
                this.stopMusic()
                this.setState({
                    success: true,
                    levelEnd: true
                })
            }
            if(this.state.levelPoints < 0 || this.state.hitFriendlyCount === 3
                || this.state.health === 0){
                clearInterval(gameLoop)
                this.stopMusic()
                this.setState({
                    levelEnd: true
                })
            }
        }, this.state.selectedLevel.BPM)
    }

    render() {
        if (this.state.targets === null){
            return <h1>LOADING!</h1>
        }
        if (this.state.levelEnd){
            return(
                <div className={this.props.selectedLevel.css}>
                    <LevelEnd
                    health={this.state.health} 
                    success={this.state.success}
                    levelPoints={this.state.levelPoints}
                    levelEnd={this.state.levelEnd}
                    levelComplete={this.props.levelComplete}
                    />
                </div>    
            )
        }
        return (

            <div className={this.props.selectedLevel.css}>
                <div className='level-column'>
                    <div className='health-container'>
                        <img className='health-img' src={this.getHealth()}></img>
                    </div>
                    <div className='game-play-container'>
                        <div className='tile-grid-container'>
                            <div className='tile-grid'>
                                {this.renderTargets()}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='score-container'>
                    <div className='strikes'>   
                        <div className='strikes-tile'>
                            <img className='stikes-img' src={this.state.hitFriendlyCount >= 1 ? friendlyStrike : friendlySmall}></img>
                        </div>
                        <div className='strikes-tile'>
                            <img className='stikes-img' src={this.state.hitFriendlyCount >= 2 ? friendlyStrike : friendlySmall}></img>
                        </div>
                        <div className='strikes-tile'>        
                            <img className='stikes-img' src={this.state.hitFriendlyCount === 3 ? friendlyStrike : friendlySmall}></img>
                        </div>
                    </div> 
                    <div className='level-score'>
                        <p style={{color:'whitesmoke', textAlign: 'center'}}>Score: {this.state.levelPoints}</p>
                    </div>
                </div> 
            </div>
            
        )
    }
}

{/* */}