/**
 * Created by ananya.chandra on 01/06/18.
 */

import React from 'react';
import {Text, View, StyleSheet, ToastAndroid} from 'react-native';
import TabIndicators from './TabIndicators';
import TabUtilsBar from './TabUtilsBar';
import {TabViewAnimated} from 'rn-keyboard-aware-tab-view';

export default class TabUtilsExample extends React.Component {

    constructor(props) {
        super(props);
        this._getTabUtilsButtonViews = this._getTabUtilsButtonViews.bind(this);
        this._onTabViewScroll = this._onTabViewScroll.bind(this);

        this.tabs = [0, 1, 2];
        this.openingTabIndex = 0;
        this.tabButtonViews = this._getTabUtilsButtonViews();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TabViewAnimated
                    onIndexChange={() => {}}
                    onPositionChange={this._onTabViewScroll}
                    style={{flex: 1}}
                    keyboardDismissMode='none'
                    navigationState={{
                        index: this.openingTabIndex,
                        routes: this.tabs.map((item, position) => {
                            return {data: item, index: position};
                        })
                    }}
                    renderScene={({route, navigationState}) => {
                        return (
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{margin: 30, fontSize: 20, alignSelf: 'center'}}>Tab {route.data + 1}</Text>
                            </View>
                        );
                    }}
                />
                <View style={{height: 1, backgroundColor: '#F0F0F0'}}/>
                <TabIndicators ref={(ref) => {this.tabIndicator = ref;}}
                               tabs={this.tabs}
                               openingTabIndex={this.openingTabIndex}
                               activeColor='#E0202C' //YNWA
                               tabIndicatorsView={{borderRadius: 0}}
                />
                <View style={{height: 1, backgroundColor: '#F0F0F0'}}/>
                <TabUtilsBar ref={(ref) => {this.tabUtilsBar = ref; }}
                             buttonViews={this.tabButtonViews}
                             selectedTabIndex={0}
                             tabUtilsBarContainer={{
                                 backgroundColor: 'white'
                             }}
                             tabIndicatorProps={{
                                 activeColor: '#2874f0',
                                 inactiveColor: 'lightgray'
                             }}
                />
            </View>
        );
    }

    _onTabViewScroll(value) {
        this.tabUtilsBar.updateOffset(value);
        this.tabIndicator.updateOffset(value);
    }

    _getTabUtilsButtonViews() {
        let buttonViews = [];
        this.tabs.forEach((tab) => {
            switch (tab) {
                case 0:
                    buttonViews.push([
                        (<Text style={styles.buttonViews} onPress={() => this._showToast('TAB 1.1')}>TAB 1.1</Text>),
                        (<Text style={styles.buttonViews} onPress={() => this._showToast('TAB 1.2')}>TAB 1.2</Text>)
                    ]);
                    break;

                case 1:
                    buttonViews.push(null);
                    break;

                case 2:
                    buttonViews.push([
                        (<View/>),
                        (<Text style={styles.buttonViews} onPress={() => this._showToast('TAB 3.2')}>TAB 3.2</Text>)
                    ]);
                    break;
            }
        });
        return buttonViews;
    }

    _showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

}

const styles = StyleSheet.create({
    buttonViews: {
        alignSelf: 'flex-end',
        color: '#2874f0',
        fontSize: 14,
        padding: 14
    }
});