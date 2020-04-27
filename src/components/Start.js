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
      percentage: "0.7",
    }
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
    if (skin.includes('Bayonet', 'Knife', 'Karambit')) {
      return true
    } else {
      return false
    }
  }

  splitDecimalsAndReturnString = (integer) => {
    return integer.toString().split('.')[0]
  }

  parsePercentage = () => {
    return parseFloat(this.state.percentage)
  }

  parseMarketValue = (mvalue) => {
    let mvalue1 = mvalue.split(',')[0];
    let mvalue2 = mvalue1.split('.').join('');
    let mvalue3 = parseInt(mvalue2, 10)

    return mvalue3
  }

  calculatePercentageValue = (mvalue) => {
    let parsedMarketValue = this.parseMarketValue(mvalue);
    let parsedPercentage = this.parsePercentage();

    return parsedMarketValue * parsedPercentage
  }

  calculateDifference = (boughtfor, mvalue) => {
    let calculatedPercentageValue = this.calculatePercentageValue(mvalue)
    let boughtFor = boughtfor
    let diff = calculatedPercentageValue - boughtFor

    return diff
  }

  fetchSkinPrice = (fullSkinName, index) => {
    fetch(`http://steamcommunity.com/market/priceoverview/?appid=730&currency=9&market_hash_name=${fullSkinName}`)
      .then((response) => response.json())
      .then(data => {
        let newState = this.state.mySkins;
        newState[index].marketvalue = data.lowest_price;
        this.setState({
          mySkins: newState,
        })
      })
  }


  render() {

    return (
      <div className="start">
        <button onClick={() => this.getMySkinsPrices()}>fetch skins</button>
        
        <div className="skinRow csgoinve-flex">
                    <div className="skinCol csgoinve-flex-center">
                        <div>name</div>
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        <div>bought for</div>
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        <div>Difference</div>
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        <div className="csgoinve-flex csgoinve-flex-center">
                            <div>Market Value</div>
                            <select onChange={(e) => this.setState({ percentage: e.target.value })}>
                                <option value="0.65">65%</option>
                                <option selected value="0.70">70%</option>
                                <option value="1.00">100%</option>
                            </select>
                        </div>
                    </div>
                </div>
        {
          this.state.mySkins.map((skin, index) => {

            return (
              <Skinrow skin={skin} key={index} difference={skin.marketvalue ? this.splitDecimalsAndReturnString(this.calculateDifference(skin.boughtFor, skin.marketvalue)) : undefined} percentagevalue={skin.marketvalue ? this.splitDecimalsAndReturnString(this.calculatePercentageValue(skin.marketvalue)) : null} />
            )
          })
        }
      </div>
    );
  }
}

export default Start;
