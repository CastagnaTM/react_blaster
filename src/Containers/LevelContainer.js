import React, { Component } from 'react';
import Tiles from '../Components/Tiles'
import '../App.css'



export default class LevelContainer extends Component{

    //refactor later to use a switch statement to run through these functions based on which level is selected

    state = {
        selectedLevel: this.props.selectedLevel,

        targets: [{name: 'one', target_type: 'debris', isClicked: false},{name: 'two', target_type: 'debris', isClicked: false},
        {name: 'three', target_type: 'debris', isClicked: false},{name: 'four', target_type: 'friendly', isClicked: false}],

        counter: 0,
        isClicked: false
    }

    handleClick = (name) => {
        let thisTarget = this.state.targets.find(target => target.name === name)
        thisTarget.isClicked = true
        this.setState({
            isClicked: true
        })
    }

    resetTargets = () => {
        let targetsCopy = [...this.state.targets];
        for(const target of targetsCopy){
            target.isClicked = false
        }
    }
    
    componentDidMount = () => {
        
        this.interval = setInterval(() =>{
            this.resetTargets()
            this.loadLevelOneGrid()
        }, 2000)    

    }
  
    loadLevelOneGrid = () => {
        this.setState({
            targets: this.shuffleGrid(this.state.targets)
        })
    }
    
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

    renderTargets = () => {
        return this.state.targets.map((tile, i) => <Tiles handleClick={this.handleClick} key={i}{...tile}/>)
    }

    render() {
        if (this.state.targets === null){
            return <h1>LOADING!</h1>
        }
        return (
            <div className='tile-grid-container'>
                <div className='tile-grid'>
                    {this.renderTargets()}
                </div>
            </div>
        )
    }

}
