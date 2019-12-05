import React, { Component } from 'react'
import HealthPotion from '../Assets/RepairsPotion.png'
import BigPotion from '../Assets/BigPotion.png'
import ArmorUpgrade from '../Assets/ArmorUpgrade.png'
import doubleBlaster from '../Assets/doubleBlaster.png'
import RYNO from '../Assets/RYNO.png'


export default class ShopItem extends Component {


    getItemImg = (name) => {
        switch(name){
            case 'Regular Health Potion':
                return HealthPotion;
            case 'Big Health Potion':
                return BigPotion
            case 'Armor Upgrade':
                return ArmorUpgrade
            case "Double Blast-O'-Matic":
                return doubleBlaster
            case 'The RYNO':
                return RYNO
            default:
                return HealthPotion;
        }
    }

    render(){
        return(
                <div>
                    <div className='shop-item' >
                        <button className='hvr-pulse-grow' onClick={() => this.props.handleSelect(this.props.name)}><img src={this.getItemImg(this.props.name)} alt={this.props.name}/></button>
                        <p className='text'>{this.props.name}{<br></br>}Price: {this.props.easterEgg? this.props.price + 50 : this.props.price} points</p>
                    </div>            
                </div>     
        )
    }
}