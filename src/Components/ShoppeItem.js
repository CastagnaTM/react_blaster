import React, { Component } from 'react'

export default class ShopItem extends Component {



    render(){
        return(
            <div className='goods-container'>
                <div className='shop-item' onClick={this.props.handlePurchase}>
                    <p className='text'>shop item one</p>
                </div>
                <div className='shop-item'>
                    <p className='text'>shop item two</p>
                </div>      
            </div>
        )
    }
}