import React, { Component } from 'react';
import LevelContainer from '../Containers/LevelContainer'
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
        levels: [],
        selectedLevel: null,
        totalPoints: 0,
        playedOnce: false,
        health: 4,
        levelsCompleted: 0,
        shoppeView: false
    }

    //calls the fetch to load level options
    componentDidMount = () => {
        this.getLevels()
    }

    //renders buttons for each load-able level
    //add abiltity to load different difficulties with different formats
    //also hide levels that haven't been unlocked yet

    getLevelButtons = () => {
       let buttonArray = this.state.levels.map((level, i) => <LevelSelector key={i}{...level} 
        loadLevel={this.loadLevel}
        />)
        return buttonArray[this.state.levelsCompleted]
    }
    
    handleShoppe = () => {
        this.setState({
            shoppeView: true
        })
    }

    handlePurchase = () => {
        if(this.state.totalPoints >= 50){
            this.setState({
                health: 4,
                totalPoints: this.state.totalPoints - 50
            })
        }
        //some sort of response if you don't have enough money
        // preferably a popup, 
    }

    loadShoppe = () => {
        return(
            <Shoppe 
            handlePurchase={this.handlePurchase}
            points={this.state.totalPoints} />
        )    
    }
    levelSelect = () => {
        return(
            <div className='home-screen-background'>
                <div className='home-screen-header'>
                    <p style={{color: 'white', marginRight: '2%'}}>{this.state.playedOnce ? `New Total Score: ${this.state.totalPoints}` : `Total Score: ${this.state.totalPoints}`}</p>
                    <p style={{color: 'white', marginRight: '2%'}}>Health: {this.state.health}</p>
                </div>
                
                <div className='home-screen-column'>
                <div style={{marginLeft: '8%'}}>
                    <button 
                        className='hvr-overline-from-right'
                        onClick={this.handleShoppe}>
                        <img src={ShoppeIcon}/>
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
                                <img className='stikes-img' src={satelliteIcon}></img>
                                <p className='text'>Shoot These</p>
                            </div>
                            <div className='instructions-icons'>
                                <img className='stikes-img' src={friendlySmall}></img>
                                <p className='text'>But Not These</p>
                            </div>
                            <div className='instructions-icons'>
                                <img className='stikes-img' src={BombIcon}></img>
                                <p className='text'>Shoot These If You Want, But It's A Bad Idea</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //uses info from the levelSelector button to set the selected level, and start the level
    loadLevel = (info) => {
        let obj = info
        this.setState({
            selectedLevel: obj,
            playLevel: true
        })
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

    //renders the levelContainer (AKA the selected level)
    play = () => {
        return (
            <LevelContainer 
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
            levelsCompleted: this.state.levelsCompleted + 1
            })
        }
        this.setState({
            playLevel: false,
        })
    }

    render() {
        //until a level is selected, show the levels avaiable
        if (this.state.playLevel === false && this.state.shoppeView === false){
            return (
                this.levelSelect()
            )
        } 
        //after selected a level, render the level
        else if (this.state.playLevel === true && this.state.shoppeView === false) {
            return (
                this.play()
            )
        }
        else if (this.state.shoppeView === true && this.state.playLevel === false){
            return this.loadShoppe()
        }
    }
        
    

}