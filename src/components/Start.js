import React, { Component } from 'react';
import '../App.css';
import request from 'request';
import { KNIFE, mySkins, TESTURL } from '../misc/variables';

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skinPrices: {},
      mySkins: mySkins
    }
  }

  

  UNSAFE_componentWillMount() {
  }

  componentDidMount() {
    this.getMySkinsPrices()
  }

  getMySkinsPrices = () => {

    this.state.mySkins.map((skin, index) => {
      let FULL_SKIN_URL = ''
      if(this.isKnife(skin.name)) {
        FULL_SKIN_URL = KNIFE + skin.name
      } else {
        FULL_SKIN_URL = skin.name
      }
      // if (this.isStattrak(skin.name)) {
      //   stat = true
      // }
      // this.fetchSkinPrice(FULL_SKIN_URL, index);

    })
    this.fetchSkinPrice(TESTURL);
  }

  // isStattrak = (skin) => {
  //   if(skin.includes('Stattrak')) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  isKnife = (skin) => {
    if(skin.includes('Bayonet', 'Flip Knife', 'Gut Knife')) {
      return true
    } else {
      return false
    }
  }

  fetchSkinPrice = (fullSkinName) => {

    // request(`http://steamcommunity.com/market/priceoverview/?appid=730&currency=9&market_hash_name=${fullSkinName}`, function (error, response, body) {
    //   let data = JSON.parse(body);
      
    //   if (error) {
    //     console.log('error:', error)
    //   }
    // })
    fetch(`http://steamcommunity.com/market/priceoverview/?appid=730&currency=9&market_hash_name=${fullSkinName}`)
    .then((response) => response.json())
    .then(data => {
      JSON.parse(data)
      console.log(data)
      // let newState = this.state.mySkins;
      // newState[index].marketvalue = data.lowest_price;
      // this.setState({
      //   mySkins: newState
      // })
    })
  }


  render() {
    // this.findSkin()

    return (
      <div className="start">
        {
          this.state.mySkins.map(skin => {
            console.log(skin)
            return <div>{skin.name}</div>
          })
        }
      </div>
    );
  }
}

export default Start;
