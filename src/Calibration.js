import React from 'react';

class Calibration extends React.Component {

    constructor() {
        super();
        this.state={
            isReadingLow: false,
            isReadingHigh: false,
        };
        this.lowReadings = {};
        this.highReadings = {};
        window.lowBounds = {};
        window.highBounds = {};        
    }

    lowFinish = () => {
        this.lowReadings.forEach( reading => {
            const avg = this.lowReadings[reading].reduce((sum,x) => sum+x) / this.lowReadings[reading].length
        
            window.lowBounds[reading] = avg
        })
    }

    highFinish = () => {
        this.highReadings.forEach( reading => {
            const avg = this.highReadings[reading].reduce((sum,x) => sum+x) / this.highReadings[reading].length
        
            window.highBounds[reading] = avg
        })
    }
    

    render() {
        const readings = {...this.props.readings}; 
        if (this.state.isReadingLow) {
            const readings = {...this.props.readings}
            for (let reading in readings) {
                if (!this.lowReadings[reading]) {
                    this.lowReadings[reading] = []
                }
                this.lowReadings[reading] += [readings[reading]] 
            }
        }
        else if (this.state.isReadingHigh) {
            const readings = {...this.props.readings}
            for (let reading in readings) {
                if (!this.highReadings[reading]) {
                    this.highReadings[reading] = []
                }
                this.highReadings[reading] += [readings[reading]] 
            }
        }
        console.log(readings)
        return (
            <div>
                This is the Calibration Component

               {console.log("high bois: ", this.highReadings)}
               {console.log("low bois: ", this.lowReadings)}

                This is the end of the Calibration Component
            </div>
        )
    }

}

export default Calibration