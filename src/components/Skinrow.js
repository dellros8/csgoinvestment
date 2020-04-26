import React, { Component } from 'react';
import '../App.css';

class Skinrow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percentage: "0.7"
        }
    }

    splitDecimalsAndReturnString = (integer) => {
        return integer.toString().split('.')[0]
    }

    parsePercentage = () => {
        return parseFloat(this.state.percentage)
    }

    parseMarketValue = () => {
        let mvalue1 = this.props.skin.marketvalue.split(',')[0];
        let mvalue2 = mvalue1.split('.').join('');
        let mvalue3 = parseInt(mvalue2, 10)

        return mvalue3
    }

    calculatePercentageValue = () => {
        let parsedMarketValue = this.parseMarketValue();
        let parsedPercentage = this.parsePercentage();

        return parsedMarketValue * parsedPercentage
    }

    calculateDifference = () => {
        let calculatedPercentageValue = this.calculatePercentageValue()
        let boughtFor = this.props.skin.boughtFor

        return calculatedPercentageValue - boughtFor
    }


    render() {
        const { skin } = this.props
        if(skin && skin.marketvalue && skin.boughtFor) {
            return (
                <div className="skinRow csgoinve-flex">
                    <div className="skinCol csgoinve-flex-center">
                        <div>Name</div>
                        <div>{skin.name}</div>
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        <div>Bought For</div>
                        <div>{skin.boughtFor.toString()}</div>
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        <div>Difference</div>
                        <div className={this.splitDecimalsAndReturnString(this.calculateDifference()) > 0 ? "colorBlue" : "colorRed"} >{this.splitDecimalsAndReturnString(this.calculateDifference())}</div>
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
                        <div>{this.splitDecimalsAndReturnString(this.calculatePercentageValue())}</div>
                    </div>
                </div>
            )
        } else {
            return <div>something went wrong with this skin</div>
        }

    }
}

export default Skinrow;
