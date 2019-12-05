import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import Targets from '../Components/Targets'
import LevelEnd from '../Components/LevelEnd'
import friendlySmall from '../Assets/FriendlySmall.png'
import friendlyStrike from '../Assets/FriendlyStrike.png'
import healthFull from '../Assets/HealthFull.png'
import health3 from '../Assets/Health3.png'
import health2 from '../Assets/Health2.png'
import health1 from '../Assets/Health1.png'
import healthEmpty from '../Assets/HealthEmpty.png'
import levelOne from '../Assets/Audio/levelOne.mp3'
import bossMusic from '../Assets/Audio/bossMusic.mp3'
let music;


export default class BossFightContainer extends Component{

    //refactor later to use a switch statement to run through these functions based on which level is selected

    state = {
        selectedLevel: this.props.selectedLevel, //this should hold all info the container needs to render this level
        blasterPower: this.props.blasterPower,
        health: this.props.health,
        maxHealth: this.props.maxHealth,
        targets: null,
        boss: [{name: 'Boss', target_type: 'boss', isClicked: 100}],
        counter: 0,
        isClicked: 0,
        levelPoints: 0,
        bossHealth: 100,
        defensesDestroyed: 0,
        success: false,
        levelEnd: false,
        firendlyBackgroundColor: '#18FCFF',
        debrisBackgroundColor: '#0B162A',
        hitFriendlyCount: 0,
        bossView: false,
    }
    

    //loads everything and holds setInterval loops
    componentDidMount = () => {
        music = new Audio(bossMusic)
        this.state.bossView ? this.runBoss() : this.runGame();    
    }

    //function for handling target clicks
    handleClick = (name, target_type) => {
        console.log(this.state.blasterPower)
        //finds the target that was clicked
        let thisTarget = this.state.targets.find(target => target.name === name)  
        //conditional for responding to target type
        if(target_type !== 'asteroid'){
            if(thisTarget.isClicked === 0){
                thisTarget.isClicked = 1
                if(target_type === 'bomb'){
                    this.setState({
                        isClicked: 1,
                        health: this.state.health-1
                        })
                }
                if(target_type === 'friendly'){
                    this.setState({
                        isClicked: 1,
                        levelPoints: this.state.levelPoints-2,
                        hitFriendlyCount: this.state.hitFriendlyCount+1
                    })
                }
            }
        }
        else if(target_type === 'asteroid'){
            if(thisTarget.isClicked < 2){
                thisTarget.isClicked += this.state.blasterPower;
                this.setState({
                    isClicked: this.state.isClicked + this.state.blasterPower
                })
                if(thisTarget.isClicked >= 2){
                    this.setState({
                        levelPoints: this.state.levelPoints+3,
                        defensesDestroyed: this.state.defensesDestroyed+1
                    })
                }
            }        
        }
    }

    handleBossClick = (name) => {
        let thisTarget = this.state.boss.find(boss => boss.name === name)
        console.log(this.state.bossHealth)
        if(thisTarget.isClicked > 0){
            thisTarget.isClicked -= this.state.blasterPower;
            this.setState({
                bossHealth: this.state.bossHealth - this.state.blasterPower
            })
            if(thisTarget.isClicked <= 0){
                this.setState({
                    levelPoints: this.state.levelPoints+1000
                })
            }
        }
    }

    // resets the state for targets, used for setInterval loop
    resetTargets = () => {
        let targetsCopy = [...this.state.targets];
        for(const target of targetsCopy){
            target.isClicked = 0
        }
    }
    //translates targetString into objects
    establishTargets = (string) => {
        
        let targets = [];
        let targetArray = string.split('');
        for (let i = 0; i < targetArray.length; i++){
            if(targetArray[i] === '1'){
                targets.push({name: i, target_type: 'friendly', isClicked: 0})
            }
            else if(targetArray[i] === '2'){
                targets.push({name: i, target_type: 'bomb', isClicked: 0})
            }
            else if(targetArray[i] === '3'){
                targets.push({name: i, target_type: 'asteroid', isClicked: 0})
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
        music.loop=true;
    }

    stopMusic = () => {
        music.pause();
        music.currentTime = 0.0;
    }

    getHealth = () => {
        if(this.state.health === this.state.maxHealth){
            return healthFull;
        }
        else if (this.state.health >= (this.state.maxHealth * 0.75) && this.state.health < (this.state.maxHealth)){
            return health3;
        }
        else if(this.state.health >= (this.state.maxHealth * 0.5) && this.state.health < (this.state.maxHealth * 0.75)){
            return health2;
        }
        else if (this.state.health > 0 && this.state.health < (this.state.maxHealth * 0.5)){
            return health1;
        }
        else{
            return healthEmpty;
        }
    }

    runGame = () => {
        this.playMusic();
        //debris game loop
        if(this.state.targets === null){
            this.establishTargets(this.state.selectedLevel.targetString)
        }
        this.runLoop()
    }
    runLoop = () => {
        var gameLoop = setInterval(() =>{
            this.resetTargets()
            this.loadLevelGrid()
            //conditions for debris loop ending
            if(this.state.defensesDestroyed >= 12){ 
                this.setState({
                    bossView: true,
                    defensesDestroyed: 0
                })
                this.runBoss();
            }
            if(this.state.bossHealth <= 0){
                clearInterval(gameLoop)
                this.setState({
                    success: true,
                    levelEnd: true
                })
            }
            //leaving first two conditions for weakened boss mode stretch goal
            else if(this.state.levelPoints < 0 || this.state.hitFriendlyCount === 3
                || this.state.health === 0){
                clearInterval(gameLoop)
                this.stopMusic()
                this.setState({
                    levelEnd: true
                })
            }
        }, 2000)
    }
    

    
    // Function for displaying boss on screen
    runBoss = () => {
        //render boss -- load Targets component with a single boss target
        console.log(this.state.counter)

        this.setState({
            counter: 0
        })
        var bossLoop = setInterval(() => {
            this.setState({
                counter: this.state.counter+1
            })
            if(this.state.bossHealth < 50 && this.state.bossHealth > 35){
                clearInterval(bossLoop)
                this.establishTargets('111122233')
                this.setState({
                    bossView: false
                })
            }
            if(this.state.counter === 2 || (this.state.bossHealth < 80 && this.state.bossHealth > 70)){
                this.setState({
                    bossView: false
                })
                clearInterval(bossLoop)

            }
        }, 2000)
    }
    renderBoss = () => {
        return <FlipMove
        staggerDelayBy={100}
        appearAnimation="elevator"
        enterAnimation="fade"
        leaveAnimation="fade"
        >
        {this.state.boss.map(boss => <Targets 
        handleBossClick={this.handleBossClick} key={boss.name}{...boss}
        />)}
        </FlipMove>
        
    }

    render() {
        if (this.state.targets === null){
            return <h1>LOADING!</h1>
        }
        if (this.state.levelEnd){
            return(
                <div className={this.props.selectedLevel.css}>
                    <LevelEnd
                    totalPoints={this.props.totalPoints}
                    gameComplete={true}
                    health={this.state.health} 
                    success={this.state.success}
                    levelPoints={this.state.levelPoints}
                    levelEnd={this.state.levelEnd}
                    levelComplete={this.props.levelComplete}
                    />
                </div>    
            )
        }
        else {

            return (
                <div className={this.props.selectedLevel.css}>
                    <div className='level-column'>
                        <div className='health-container'>
                            <img className='health-img' src={this.getHealth()} alt="health meter"></img>
                        </div>
                        <div className='game-play-container'>
                            <div className='tile-grid-container'>
                                <div className='tile-grid' style={{display: this.state.bossView ? 'none' : 'block'}}>
                                    {this.renderTargets()}
                                </div>
                                <div className='tile-grid' style={{display: this.state.bossView ? 'block' : 'none'}}>
                                    {this.renderBoss()}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='score-container'>
                    <div className='strikes'>   
                        <div className='strikes-tile'>
                            <img className='stikes-img' src={this.state.hitFriendlyCount >= 1 ? friendlyStrike : friendlySmall} alt="alien strikes"></img>
                        </div>
                        <div className='strikes-tile'>
                            <img className='stikes-img' src={this.state.hitFriendlyCount >= 2 ? friendlyStrike : friendlySmall} alt="alien strikes"></img>
                        </div>
                        <div className='strikes-tile'>        
                            <img className='stikes-img' src={this.state.hitFriendlyCount === 3 ? friendlyStrike : friendlySmall} alt="alien strikes"></img>
                        </div>
                    </div> 
                        <div className='level-score'>
                            <p style={{color:'whitesmoke', textAlign: 'center'}}>
                                {this.state.bossView ? 'Boss Health: ' + this.state.bossHealth : 'Score:' + this.state.levelPoints}
                                </p>
                        </div>
                    </div> 
                </div> 
            )
        }
    }
}