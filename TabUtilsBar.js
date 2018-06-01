/**
 * Created by ananya.chandra on 02/04/18.
 */

import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';
import TabIndicators from './TabIndicators';

export default class TabUtilsBar extends React.Component {

    static propTypes = {
        /**
         * Pass an array of views.
         * eg. [<View1>, <View2>, <View3>] - Each view for each tab.
         * Can also pass array of views as an array element.
         * eg. [<View1>, [<View2.1>, <View2.2>], <View3>] - View2.1 and View2.2 will both appear for tab 2.
         */
        buttonViews: PropTypes.array.isRequired,

        /**
         * Default is 0.5 - The buttons completely fade away at midway point while scrolling
         * between two tabs.
         */
        buttonsFadeOffset: PropTypes.number,

        selectedTabIndex: PropTypes.number.isRequired,
        showTabIndicators: PropTypes.bool,
        tabIndicatorProps: PropTypes.object,
        tabUtilsBarContainer: PropTypes.object,
        tabUtilsButtonsContainer: PropTypes.object
    };

    constructor(props) {
        super(props);
        this._toggleSwipeStopped = this._toggleSwipeStopped.bind(this);

        this._openingTabIndex = props.selectedTabIndex;

        this.state = {
            offset: new Animated.Value(this._openingTabIndex),
            swipeStopped: true
        }
    }

    componentDidMount() {
        this.state.offset.addListener(this._toggleSwipeStopped);
    }

    _toggleSwipeStopped(offset) {
        if (offset.value % 1 === 0) {
            this.setState({
                swipeStopped: true
            });
        } else if (this.state.swipeStopped) {
            this.setState({
                swipeStopped: false
            })
        }
    }

    updateOffset(value) {
        if (this.tabIndicator) {
            this.state.offset.setValue(value);
            this.tabIndicator.updateOffset(value);
        }
    }

    render() {
        return (
            <View style={[styles.tabUtilsBarContainer, this.props.tabUtilsBarContainer]}>
                {this.props.buttonViews.map((item, index) => {
                    const opacity = this.state.offset.interpolate({
                        inputRange: [
                            index - 100,
                            index - this.props.buttonsFadeOffset,
                            index,
                            index + this.props.buttonsFadeOffset,
                            index + 100
                        ],
                        outputRange: [0, 0, 1, 0, 0]
                    });
                    return (
                        <Animated.View display={!this.state.swipeStopped ? "flex" : (index === this.state.offset._value ? "flex" : "none" )}
                                       style={[styles.tabUtilsButtonsContainer, this.props.tabUtilsButtonsContainer, {opacity: opacity}]}>
                            {item}
                        </Animated.View>
                    );
                })}
                {this.props.showTabIndicators ?
                    <TabIndicators ref={(ref) => {this.tabIndicator = ref}}
                                   {...this.props.tabIndicatorProps}
                                   tabs={this.props.buttonViews}
                                   openingTabIndex={this._openingTabIndex}/>
                    : null}
            </View>
        );
    }

}

TabUtilsBar.defaultProps = {
    showTabIndicators: true,
    buttonsFadeOffset: 0.5
};

const styles = StyleSheet.create({

    tabUtilsBarContainer: {
        height: 42,
        width: "100%",
        backgroundColor: 'transparent'
    },

    tabUtilsButtonsContainer: {
        width: "100%",
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});
