/**
 * Created by ananya.chandra on 23/03/18.
 */

import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';

let size;
class TabIndicators extends React.Component {

    static propTypes = {
        tabs: PropTypes.array.isRequired,
        activeColor: PropTypes.string,
        inactiveColor: PropTypes.string,
        tabIndicatorsContainer: PropTypes.object,
        tabIndicatorsView: PropTypes.object,

        /**
         * Height and width of the default circular indicator.
         * Default = 7.
         * Shape can be changed using tabIndicatorsView.
         */
        size: PropTypes.number,

        /**
         * Passing this won't cause initial jerk.
         */
        openingTabIndex: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.updateOffset = this.updateOffset.bind(this);

        this._tabs = props.tabs;
        size = props.size;
        this._defaultTabIndicatorsView = {
            height: size,
            width: size,
            borderRadius: size,
            margin: size/2
        };

        this.state = {
            _offset: new Animated.Value(props.openingTabIndex),
            activeColor: props.activeColor,
            inactiveColor: props.inactiveColor
        }
    }

    updateOffset(offset) {
        this.state._offset.setValue(offset);
    }

    render() {
        return (
            <View style={[styles.tabIndicatorsContainer, this.props.tabIndicatorsContainer]}>
        {this._tabs.map((item, index) => {
            let color = this.state._offset.interpolate({
                inputRange: [
                    index-100,
                    index-1,
                    index,
                    index+1,
                    index+100
                ],
                outputRange: [
                    this.props.inactiveColor,
                    this.props.inactiveColor,
                    this.props.activeColor,
                    this.props.inactiveColor,
                    this.props.inactiveColor
                ]
            });
            return (
                <Animated.View style={[this._defaultTabIndicatorsView, this.props.tabIndicatorsView, {backgroundColor: color}]}/>
        );
        })}
    </View>
    );
    }

}

TabIndicators.defaultProps = {
    activeColor: 'black',
    inactiveColor: 'lightgray',
    size: 7
};

const styles = StyleSheet.create({

    tabIndicatorsContainer: {
        flexDirection: 'row',
        height: 42,
        width: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }

});

export default TabIndicators;
