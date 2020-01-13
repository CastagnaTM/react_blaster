import React, { Component } from 'react';
import LevelContainer from '../Containers/LevelContainer'
import BossFightContainer from '../Containers/BossFightContainer'
import LevelSelector from './LevelSelector'
import Shoppe from './Shoppe'
import friendlySmall from '../Assets/Friendly1.png'
import satelliteIcon from '../Assets/SatelliteIcon.png'
import Bomb from '../Assets/Bomb.png'
import ShoppeIcon from '../Assets/ShoppeIcon.png'
import Asteroids from '../Assets/Asteroids.png'
import homescreenMusic from '../Assets/Audio/homescreenMusic.mp3'
import shopMusic from '../Assets/Audio/shopMusic.mp3'

let music = new Audio(homescreenMusic);
let shopTunes = new Audio(shopMusic)


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
        showLevelInfo: false,
        moreInstructions: false,
        easterEgg: false,
        alertMessage: null
    }

    //calls the fetch to load level options
    componentDidMount = () => {
        this.getLevels();
        music.play()
        music.loop=true;
    }

    //fetches the levels
    getLevels = () => {
        fetch('https://react-blaster-backend.herokuapp.com/levels')
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
        playedOnce={this.state.playedOnce}
        showLevelInfo={this.state.showLevelInfo} 
        loadLevelInfo={this.loadLevelInfo}
        selectedLevel={this.state.selectedLevel} 
        loadLevel={this.loadLevel}
        />)
        return buttonArray[this.state.levelsCompleted]
    }

    moreInstructions = () => {
        // if(this.state.moreInstructions === false){
        //     this.setState({
        //         moreInstructions: 'A'
        //     })
        // }
        // else if(this.state.moreInstructions === 'A'){
        //     this.setState({
        //         moreInstructions: 'B'
        //     })
        // }
        // else if(this.state.moreInstructions === 'B'){
        //     this.setState({
        //         moreInstructions: false
        //     })
        // }

        this.setState({
            moreInstructions: !this.state.moreInstructions
        })
    }
    
    handleShoppe = () => {
        music.pause()
        music.currentTime=0.0
        
        this.setState({
            shoppeView: true
        })
        shopTunes.play()
        music.loop=true;
    }

    handleEasterEgg = () => {
        this.setState({
            easterEgg: true
        })
    }
    
    updateAlert = (message) => {
        this.setState({
            alertMessage: message
        })
    }

    closeAlert = () => {
        this.setState({
            alertMessage: null
        })
    }

    handlePurchase = (item) => {
        let price = this.state.easterEgg? item.price+30 : item.price
        if(this.state.totalPoints >= price){
            switch(item.name){
                case 'Regular Health Potion':
                    if(this.state.maxHealth === 4){
                        if (this.state.health >= 2){
                            this.setState({
                                health: 4,
                                totalPoints: this.state.totalPoints - price
                            })
                        }
                        else {
                            this.setState({
                                health: this.state.health+2,
                                totalPoints: this.state.totalPoints - price
                            })
                        }
                    }
                    if(this.state.maxHealth === 8){
                        if (this.state.health >= 6){
                            this.setState({
                                health: 8,
                                totalPoints: this.state.totalPoints - price
                            })
                        }
                        else {
                            this.setState({
                                health: this.state.health+2,
                                totalPoints: this.state.totalPoints - price
                            })
                        }
                    }
                    break;
                case 'Big Health Potion':
                        this.setState({
                            health: this.state.maxHealth,
                            totalPoints: this.state.totalPoints - price
                        })
                    break;
                case "Double Blast-O'-Matic":
                    if(this.state.blasterPower === 3){
                        this.updateAlert("You'll Need The RYNO If You Want To Upgrade Your Firing Power Further")
                        // alert("You'll Need The RYNO If You Want To Upgrade Your Firing Power Further")
                    }
                    else if(this.state.blasterPower === 5){
                        this.updateAlert("You've Already Maxed Out Your Firing Power")
                        // alert("You've Already Maxed Out Your Firing Power")
                    }
                    else{
                        this.setState({
                            blasterPower: 3,
                            totalPoints: this.state.totalPoints - price
                        })
                    }
                    break;
                case "The RYNO":
                        if(this.state.blasterPower === 5){
                            this.updateAlert("You've Already Maxed Out Your Firing Power")
                            // alert("You've Already Maxed Out Your Firing Power")
                        }
                        else{
                            this.setState({
                                blasterPower: 5,
                                totalPoints: this.state.totalPoints - price
                            })
                        }
                    break;
                case 'Armor Upgrade':
                    if (this.state.maxHealth === 8){
                        this.updateAlert("You've Already Maxed Out Your Armor")
                        // alert("You've Already Maxed Out Your Armor")
                    }
                    else {
                        this.setState({
                            maxHealth: 8,
                            totalPoints: this.state.totalPoints - price
                        })
                    }
                    break;
                default:
                    console.log('something went wrong')
                    break;
            }
        }
        else{
            this.updateAlert("You Can't Afford That!")
            // alert("You Can't Afford That!")
        }
        
    }

    backToGame = () => {
        shopTunes.pause()
        shopTunes.currentTime=0.0
        this.setState({
            shoppeView: false
        })
        music.play()
    }

    loadShoppe = () => {
        return(
            <Shoppe
            maxHealth={this.state.maxHealth}
            handleEasterEgg={this.handleEasterEgg}
            easterEgg={this.state.easterEgg}
            blasterPower={this.state.blasterPower}
            backToGame={this.backToGame}
            health={this.state.health}
            handlePurchase={this.handlePurchase}
            points={this.state.totalPoints} 
            alertMessage={this.state.alertMessage}
            closeAlert={this.closeAlert}
            />
        )    
    }

    levelSelect = () => {
        return(
            <div className='home-screen-background'>
                <div className='home-screen-header'>
                    <p className='text' style={{marginRight: '2%', marginTop: '0%'}}>{this.state.playedOnce ? `New Total Score: ${this.state.totalPoints}` : `Total Score: ${this.state.totalPoints}`}</p>
                    <p className='text' style={{marginRight: '2%'}}>Health: {this.state.health}/{this.state.maxHealth}</p>
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
                        <div className='lines' style={{display: this.state.moreInstructions ? 'none' : 'block'}}>
                            <h3 className='text' id='instructions-text' style={{marginBottom: '1%'}}>Level Instructions</h3>
                            <p className='text' >In each 30 second level, you will be presented with a grid of targets</p>
                            <p className='text' >These targets will shuffle and reset every two seconds</p>
                            <p className='text' >Click on a target to fire your blaster, but pay attention! Not every target is one you'll want to blast... </p>
                            <p className='text'>Click On The Level Button On The Left To Load An Example GIF For The Level</p>
                            <div className='instructions-icons' style={{marginBottom: '1%'}}>
                                <p className='text'>Visit The Shoppe And Spend Your Points To Buy Health Potions And Upgrades. Your Health And Points Will Be Displayed In The Upper Right Corner</p>
                                <img className='instructions-img' src={ShoppeIcon} alt="shop-icon"></img>
                            </div>
                            <button className='more-button' onClick={() => this.moreInstructions()}>Next</button>
                        </div>
                        <div className='lines' style={{display: this.state.moreInstructions ? 'block' : 'none'}}>
                            <h3 className='text' id='instructions-text'>Targets: </h3>
                            <div className='instructions-icons'>
                                <p className='text'>Earn Points By Blasting These Satellites</p>
                                <img className='instructions-img' src={satelliteIcon} alt="satellite icon"></img>
                            </div>
                            <div className='instructions-icons'>
                                <p className='text'>You'll Lose 2 Points For Blasting Aliens. Blast Three And You Lose The Level!</p>
                                <img className='instructions-img' src={friendlySmall} alt= "alien"></img>
                            </div>
                            <div className='instructions-icons'>
                                <p className='text'>Destroying These Asteroids Requires Twice As Many Shots As Satellites. Earn 3 Points For Destroying Them!</p>
                                <img className='instructions-img' src={Asteroids} alt="asteroid icon"></img>
                            </div>
                            <div className='instructions-icons'>
                                <p className='text'>Blasting These Bombs Will Cost You 1 Health Point</p>
                                <img className='instructions-img' src={Bomb} alt="bomb icon"></img>
                            </div>
                            <button className='more-button' onClick={() => this.moreInstructions()}>Back</button>
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
    
    stopMusic = () => {
        music.pause();
        music.currentTime = 0.0;
    }

    //renders the levelContainer (AKA the selected level)
    play = () => {
        this.stopMusic()
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
        this.stopMusic()
        return(
            <BossFightContainer
                totalPoints={this.state.totalPoints}
                blasterPower={this.state.blasterPower}
                maxHealth={this.state.maxHealth} 
                health={this.state.health}
                selectedLevel={this.state.selectedLevel}
                levelComplete={this.levelComplete}
            />
        )
    }

    levelComplete = (completed, levelPoints, health, newGame) =>{
        music.play()
        if (completed === true){
            this.setState({
            totalPoints: newGame === false ? (this.state.totalPoints + levelPoints) : 0,
            health: newGame === false ? health : 4,
            playedOnce: true,
            levelsCompleted: newGame === false ? (this.state.levelsCompleted + 1) : 0,
            showLevelInfo: false,
            maxHealth: newGame === false ? this.state.maxHealth : 4
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
            return (
                this.loadShoppe()
            )
        }
    }
}