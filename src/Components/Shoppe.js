import React, { Component } from 'react'
import ShoppeItem from './ShoppeItem'
import backIcon from '../Assets/BackToGame.png'

export default class Shoppe extends Component {
    // create a null items state
    // fetch items from backend
    // map them over shoppeItem with a name, type, description, and price

    state = {
        items: [],
        selectedItem: "none"
    }

    componentDidMount = () => {
        this.getItems()
    }

    getItems = () => {
        fetch('http://localhost:3000/items')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                items: data
            })
        });
    }

    loadGoods = () => {
        let items = this.state.items;
       return( 
           items.map((item, i) => <ShoppeItem 
            key={i}{...item}
            handleSelect={this.handleSelect}
            />)
       )
    }

    handleSelect = (name) => {
        let thisItem = this.state.items.find(item => item.name === name);
        this.setState({
            selectedItem: thisItem
        })
        console.log(this.state.selectedItem)
        console.log(this.props.blasterPower)
    }

    loadDescription = () => {
        if (this.state.selectedItem === 'none'){
            return null
        }
        else {
            return(
                <div className='description-container'>
                    <p className='text'>{this.state.selectedItem.description}</p>
                    <button className='hvr-ripple-out2' style={{marginLeft: '15%', width: '70%'}}
                    onClick={() => this.props.handlePurchase(this.state.selectedItem)}>Purchase</button>
                </div>
            )
        }
    }


    render(){
        return(
            <div className='home-screen-background'>
                <div className='shoppe-header'>
                    <p className='text' style={{fontWeight: 'bolder'}}>Shoppe</p>
                    <div className='shoppe-header-row'>
                        <p className='text' >Buy Somethin' Will Ya?</p>
                        <p className='text' style={{marginLeft: '45%'}}> Available Points: {this.props.points}, Your Health: {this.props.health}</p> 
                    </div>                    
                </div>
                <div className='shoppe-body'>
                    <div style={{marginLeft: '8%'}}>
                        <button 
                            className='hvr-overline-from-right-back'
                            onClick={this.props.backToGame}>
                            <img src={backIcon}/>
                        </button>
                    </div>
                    <div className='shopkeeper'>

                    </div>
                    <div className='goods'>
                        <div className='goods-container'>
                            <p className='text'>Goods:</p>
                            {this.loadGoods()}
                        </div>
                    </div>
                    <div className='description'>
                        <p className='text'>Description...{<br></br>}</p>
                        {this.loadDescription()}
                    </div>
                </div>
            </div>
        )
    }

}