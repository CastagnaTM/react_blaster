import React, { Component } from 'react'
import ShoppeItem from './ShoppeItem'

export default class Shoppe extends Component {



    render(){
        return(
            <div className='home-screen-background'>
                <div className='home-screen-header'>
                    <h4 style={{color: 'white'}}>Shoppe</h4>
                    <p style={{color: 'white'}}>Buy Somethin' Will Ya?</p>
                </div>
                <div className='shoppe-body'>
                    <div className='shopkeeper'>

                    </div>
                    <div className='goods'>
                            <ShoppeItem 
                            handlePuchase={this.props.handlePuchase}
                            />
                    </div>
                    <div className='inventory'>

                    </div>
                </div>
            </div>
        )
    }

}