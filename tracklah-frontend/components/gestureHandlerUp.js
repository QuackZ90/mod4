import React, {Component} from 'react';
import {Animated, Dimensions} from 'react-native';
import { 
    GestureHandlerRootView,
    PanGestureHandler
} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');
const circleRadius = 30;

class SwipeUp extends Component {
    touchX = new Animated.Value(width/2 - circleRadius);

    onPanGestureEvent = Animated.event([{ nativeEvent: { x: this.touchX }}], {
        useNativeDriver: true
    });

    render() {
        return (
            <GestureHandlerRootView>
                <PanGestureHandler onGestureEvent={this.onPanGestureEvent}>
                    <Animated.View
                        style={[
                            {transform: [
                                {
                                    translateX: Animated.add(this.touchX, new Animated.Value(-circleRadius))
                                }
                            ]}
                        ]}
                    />
                </PanGestureHandler>
            </GestureHandlerRootView>
        )
    }
};

export default SwipeUp;