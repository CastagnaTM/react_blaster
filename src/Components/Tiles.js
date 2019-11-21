import React, { Component} from 'react'
import '../App.css'
import friendly1 from '../Assets/Friendly1.png'
import friendlySad from '../Assets/FriendlySad.png'



export default class Tiles extends Component{

    state = {
        isClicked: false,
        // backgroundColor: '#18FCFF'
    }
    
    

    handleClick = () => {
        if(this.props.target_type === "friendly"){
            this.setState({
                isClicked: true,
                backgroundColor: '#3F1923'
            })
        } else{
            this.setState({
                isClicked: true,
                backgroundColor: 'green'
            })
        }
        
    }
    
    render() {
        if(this.props.target_type === 'debris'){
            return (
                <div className='tile-target' onClick={this.handleClick} style={{backgroundColor: this.state.backgroundColor}}>
                    <p>{this.props.target_type}</p>
                </div>
            )
        } else if(this.props.target_type === 'friendly'){
            return(
                <div className='tile-target' onClick={this.handleClick} style={{backgroundColor: this.state.backgroundColor}}>
                    <img className='tile-img' style={{backgroundColor: this.state.friendlyBackgroundColor}} 
                    src={this.state.isClicked ? friendlySad : friendly1}/>
            </div>
            )
        }
       
    }
}