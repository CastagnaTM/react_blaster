import React, { Component } from 'react';
import LevelContainer from '../Containers/LevelContainer'
import BossFightContainer from '../Containers/BossFightContainer'
import LevelSelector from './LevelSelector'
import Shoppe from './Shoppe'
import friendlySmall from '../Assets/FriendlySmall.png'
import satelliteIcon from '../Assets/SatelliteIcon.png'
import BombIcon from '../Assets/BombIcon.png'
import ShoppeIcon from '../Assets/ShoppeIcon.png'



//this component holds the homescreen, including level selection and potentially other options

export default class HomeScreen extends Component{

    state = {
        playLevel: false,
        fightBoss: false, 
        playedOnce: false,
        levels: [],
        selectedLevel: null,
        levelsCompleted: 0,
        totalPoints: 0,
        health: 4,
        maxHealth: 4,
        blasterPower: 1,
        shoppeView: false,
        showLevelInfo: false
    }

    //calls the fetch to load level options
    componentDidMount = () => {
        this.getLevels()
    }

    //fetches the levels
    getLevels = () => {
        fetch('http://localhost:3000/levels')
        .then(resp => resp.json())
        .then(data => {
           this.setState({
               levels: data
           })
        })
    }

    //renders buttons for each load-able level
    getLevelButtons = () => {
       let buttonArray = this.state.levels.map((level, i) => <LevelSelector key={i}{...level}
        showLevelInfo={this.state.showLevelInfo} 
        loadLevelInfo={this.loadLevelInfo}
        selectedLevel={this.state.selectedLevel} 
        loadLevel={this.loadLevel}
        />)
        return buttonArray[this.state.levelsCompleted]
        // return buttonArray[3]
    }
    
    handleShoppe = () => {
        this.setState({
            shoppeView: true
        })
    }

    handlePurchase = (item) => {
        if(this.state.totalPoints >= item.price){
            switch(item.name){
                case 'Regular Health Potion':
                    if(this.state.maxHealth === 4){
                        if (this.state.health >= 2){
                            this.setState({
                                health: 4,
                                totalPoints: this.state.totalPoints - item.price
                            })
                        }
                        else {
                            this.setState({
                                health: this.state.health+2,
                                totalPoints: this.state.totalPoints - item.price
                            })
                        }
                    }
                    if(this.state.maxHealth === 8){
                        if (this.state.health >= 6){
                            this.setState({
                                health: 8,
                                totalPoints: this.state.totalPoints - item.price
                            })
                        }
                        else {
                            this.setState({
                                health: this.state.health+2,
                                totalPoints: this.state.totalPoints - item.price
                            })
                        }
                    }
                    break;
                case 'Big Health Potion':
                        this.setState({
                            health: this.state.maxHealth,
                            totalPoints: this.state.totalPoints - item.price
                        })
                    break;
                case "Double Blast-O'-Matic":
                        this.setState({
                            blasterPower: 2,
                            totalPoints: this.state.totalPoints - item.price
                        })
                    break;
                case "The RYNO":
                        this.setState({
                            blasterPower: 5,
                            totalPoints: this.state.totalPoints - item.price
                        })
                    break;
                case 'Armor Upgrade':
                    this.setState({
                        maxHealth: 8,
                        totalPoints: this.state.totalPoints - item.price
                    })
                    break;
                default:
                    console.log('something went wrong')
                    break;
            }
        }
        else{
            console.log('not enough monies!')
        }
        
    }

    backToGame = () => {
        this.setState({
            shoppeView: false
        })
    }

    loadShoppe = () => {
        return(
            <Shoppe 
            backToGame={this.backToGame}
            health={this.state.health}
            handlePurchase={this.handlePurchase}
            points={this.state.totalPoints} />
        )    
    }

    levelSelect = () => {
        return(
            <div className='home-screen-background'>
                <div className='home-screen-header'>
                    <p className='text' style={{marginRight: '2%'}}>{this.state.playedOnce ? `New Total Score: ${this.state.totalPoints}` : `Total Score: ${this.state.totalPoints}`}</p>
                    <p className='text' style={{marginRight: '2%'}}>Health: {this.state.health}</p>
                </div>
                
                <div className='home-screen-column'>
                <div style={{marginLeft: '8%'}}>
                    <button 
                        className='hvr-overline-from-right'
                        onClick={this.handleShoppe}>
                        <img src={ShoppeIcon} alt="shop"/>
                    </button>
                </div>
                    <div className='level-select-container'>
                        <div className='level-select'>
                            {this.getLevelButtons()}
                                
                        </div>
                    </div>
                    <div className='instructions'>
                        <div className='lines'>
                            <h3 className='text'>Instructions</h3>
                            <p className='text'>You Have 30 seconds to:</p>
                            <div className='instructions-icons'>
                                <img className='stikes-img' src={satelliteIcon} alt="satellite"></img>
                                <p className='text'>Shoot These</p>
                            </div>
                            <div className='instructions-icons'>
                                <img className='stikes-img' src={friendlySmall} alt="alien"></img>
                                <p className='text'>But Not These</p>
                            </div>
                            <div className='instructions-icons'>
                                <img className='stikes-img' src={BombIcon} alt="bomb"></img>
                                <p className='text'>Shoot These If You Want, But It's A Bad Idea</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //uses info from the levelSelector button to set the selected level, and start the level
    loadLevelInfo = () => {
        this.setState({
            showLevelInfo: true
        })
    }

    loadLevel = (info) => {
        let obj = info
        if(obj.name === 'Boss Fight!'){
            console.log('boss fight')
            this.setState({
                selectedLevel: obj,
                fightBoss: true
            })
        }
        else {
            this.setState({
                selectedLevel: obj,
                playLevel: true,
            })
        }
        
    }
    

    //renders the levelContainer (AKA the selected level)
    play = () => {
        return (
            <LevelContainer
                blasterPower={this.state.blasterPower}
                maxHealth={this.state.maxHealth} 
                health={this.state.health}
                selectedLevel={this.state.selectedLevel}
                levelComplete={this.levelComplete}
            />
        )
    }

    //fight boss function here. Also update render to call this method if fightBoss === true and shoppeview = false

    loadBossFight = () => {
        return(
            <BossFightContainer
                blasterPower={this.state.blasterPower}
                maxHealth={this.state.maxHealth} 
                health={this.state.health}
                selectedLevel={this.state.selectedLevel}
                levelComplete={this.levelComplete}
            />
        )
    }

    levelComplete = (completed, levelPoints, health) =>{
        if (completed === true){
            this.setState({
            totalPoints: this.state.totalPoints + levelPoints,
            health: health,
            playedOnce: true,
            levelsCompleted: this.state.levelsCompleted + 1,
            showLevelInfo: false
            })
        }
        this.setState({
            playLevel: false,
            fightBoss: false
        })
    }

    render() {
        //until a level is selected, show the levels avaiable
        if (this.state.playLevel === false && this.state.shoppeView === false && this.state.fightBoss === false){
            return (
                this.levelSelect()
            )
        } 
        //after selected a level, render the level
        else if (this.state.playLevel === true && this.state.shoppeView === false && this.state.fightBoss === false) {
            return (
                this.play()
            )
        }
        else if (this.state.fightBoss === true && this.state.playLevel === false && this.state.shoppeView === false) {
            return (
                this.loadBossFight()
            )
        }
        else if (this.state.shoppeView === true && this.state.playLevel === false && this.state.fightBoss === false){
            return this.loadShoppe()
        }
    }
        
    

}