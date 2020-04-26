import React, { Component } from 'react';
import '../App.css';
import { KNIFE, mySkins } from '../misc/variables';
import '../styles/Start.css';
import Skinrow from './Skinrow';

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mySkins: mySkins,
      percentage: "0.70"
    }
  }



  UNSAFE_componentWillMount() {
  }

  componentDidMount() {
    this.getMySkinsPrices()
  }

  getMySkinsPrices = () => {
    this.state.mySkins.map((skin, index) => {
      let FULL_SKIN_URL = `${this.isKnife(skin.name) ? KNIFE : ''}${skin.name}`

      this.fetchSkinPrice(FULL_SKIN_URL, index);
      
    })
  }

  isStattrak = (skin) => {
    if (skin.includes('Stattrak')) {
      return true
    } else {
      return false
    }
  }

  isKnife = (skin) => {
    if (skin.includes('Bayonet', 'Flip Knife', 'Gut Knife')) {
      return true
    } else {
      return false
    }
  }

  fetchSkinPrice = (fullSkinName, index) => {

    // request(`http://steamcommunity.com/market/priceoverview/?appid=730&currency=9&market_hash_name=${fullSkinName}`, function (error, response, body) {
    //   let data = JSON.parse(body);

    //   if (error) {
    //     console.log('error:', error)
    //   }
    // })
    fetch(`http://steamcommunity.com/market/priceoverview/?appid=730&currency=9&market_hash_name=${fullSkinName}`)
      .then((response) => response.json())
      .then(data => {
        let newState = this.state.mySkins;
        newState[index].marketvalue = data.lowest_price;
        this.setState({
          mySkins: newState
        })
      })
  }


  render() {
    // this.findSkin()

    return (
      <div className="start">
        {
          this.state.mySkins.map((skin, index) => {
            
            return (
              <Skinrow skin={skin} key={index} />
            )
          })
        }
      </div>
    );
  }
}

export default Start;
