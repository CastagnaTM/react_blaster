import React, { Component} from 'react'
import friendly1 from '../Assets/Friendly1.png'
import friendlySad from '../Assets/FriendlySad.png'



export default class Targets extends Component{

    state = {
        backgroundColor: '#18FCFF',
        count: 0
    }

    resetState = () => {
            this.setState({
            isClicked: false,
            backgroundColor: '#18FCFF'
        })
    }
    
    render() {
       
        if(this.props.target_type === 'debris'){
           
            return (
                <div className='tile-target' onClick={() => this.props.handleClick(this.props.name, this.props.target_type)} style={{backgroundColor: this.props.isClicked ? 'green' : this.state.backgroundColor}} >
                    <p>{this.props.target_type}</p>
                </div>
            )
        } 
        if(this.props.target_type === 'friendly'){
            return(
                <div className='tile-target' onClick={() => this.props.handleClick(this.props.name, this.props.target_type)} style={{backgroundColor: this.props.isClicked ? '#3F1923' : this.state.backgroundColor}}>
                    <img className='tile-img' src={this.props.isClicked ? friendlySad : friendly1}/>
            </div>
            )
        }
       
    }
}