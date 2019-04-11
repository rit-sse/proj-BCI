import React from 'react';
import img from './spinner.png';

class FidgetSpinner extends React.Component{

    constructor(props){
        super(props);
        this.spinValue = new Animated.Value(0);
    }

    spin () {
        const { speed } = this.props;

        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            easing: Easing.linear,
    
          }
        ).start(() => this.spin())
      }
    
    componentDidMount () {
        this.spin();
      }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Animated.Image
            style={{
              width: 400,
              height: 400,
              transform: [{rotate: spin}] }}
              source={{uri: img}}
          />
          </View>    
        );
      }
}

export default FidgetSpinner;