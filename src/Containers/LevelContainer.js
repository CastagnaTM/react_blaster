import React, { Component } from 'react';
import Targets from '../Components/Targets'
import LevelEnd from '../Components/LevelEnd'
import FlipMove from 'react-flip-move'

export default class LevelContainer extends Component{

    //refactor later to use a switch statement to run through these functions based on which level is selected

    state = {
        selectedLevel: this.props.selectedLevel, //this should hold all info the container needs to render this level

        targets: null,
        counter: 0,
        isClicked: false,
        levelPoints: 0,
        success: false,
        levelEnd: false,
        firendlyBackgroundColor: '#18FCFF',
        debrisBackgroundColor: '#0B162A',
       
    }

    //loads everything and holds setInterval loops
    componentDidMount = () => {
        
        this.runGame()    
        
    }

    runGame = () => {
        //translate targets function
        if (this.state.targets === null){
            this.establishTargets(this.state.selectedLevel.targetString)
        }
        var gameLoop = setInterval(() =>{
            this.resetTargets()
            this.loadLevelGrid()
            this.setState({
                counter: this.state.counter+1
            })
            //conditions for level ending
            if(this.state.counter === 5 ){
                clearInterval(gameLoop)
                this.setState({
                    success: true,
                    levelEnd: true
                })
            }
            if(this.state.levelPoints < 0){
                clearInterval(gameLoop)
                this.setState({
                    levelEnd: true
                })
            }
        }, this.state.selectedLevel.BPM)
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
                levelPoints: this.state.levelPoints-2
            })
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

    render() {
        if (this.state.targets === null){
            return <h1>LOADING!</h1>
        }
        if (this.state.levelEnd){
            return(
                <div className={this.props.selectedLevel.css}>
                    <LevelEnd 
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
                <div className='tile-grid-container'>
                    <div className='tile-grid'>
                        {this.renderTargets()}
                    </div>
                </div>
                <div className='level-score'>
                    <p style={{color:'whitesmoke', textAlign: 'center'}}>Score: {this.state.levelPoints}</p>
                </div>
            </div>
            
        )
    }
}
