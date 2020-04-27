import React, { Component } from 'react';
import '../App.css';

class Skinrow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percentage: "0.7"
        }
    }


    render() {
        const { skin, difference, percentagevalue } = this.props
        if (skin) {
            return (
                <div className="skinRow csgoinve-flex">
                    <div className="skinCol csgoinve-flex-center">
                        <div>{skin.name}</div>
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        <div>{skin.boughtFor.toString() + ' kr'}</div>
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        {
                            difference ?
                                <div className={difference > 0 ? "colorBlue" : "colorRed"} >{difference + ' kr'}</div>
                                :
                                ''
                        }
                    </div>
                    <div className="skinCol csgoinve-flex-center">
                        {
                            percentagevalue ?
                                <div>{percentagevalue + ' kr'}</div>
                                :
                                ''
                        }

                    </div>
                </div>
            )
        } else {
            return <div>something went wrong with this skin</div>
        }

    }
}

export default Skinrow;
