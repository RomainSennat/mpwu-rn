// NODE MODULES IMPORT
import React from 'react';
import { SegmentedControlIOS, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CommonStyle } from '../common/styles';
import FromPlace from '../components/FromPlace';
import PrepareTime from '../components/PrepareTime';
import RssUrl from '../components/RssUrl';
import ToPlace from '../components/ToPlace';
import TransportMode from '../components/TransportMode';

export default class Settings extends React.Component {
    
    // CONSTRUCTOR
    constructor() {
        super();
        // Default state
        this.state = { tab: 0 };
        // Bind event handlers to class instance
        this._handle_switch = this._handle_switch.bind(this);
    }
    
    // EVENT HANDLERS
    async _handle_switch({ nativeEvent }) {
       this.setState({ tab: nativeEvent.selectedSegmentIndex });
    }
    
    // RENDERERS
    renderTabChilds() {
        if (this.state.tab === 0) {
            return [ <FromPlace key="from" />, <ToPlace key="to" />, <TransportMode key="transport_mode" /> ];
        }
        return [ <RssUrl key="rss_url" />, <PrepareTime key="prepare_time" /> ];
    }
    
    render() {
        return (
            <LinearGradient
                colors={[ '#985e6d', '#494e6B' ]}
                end={{ x: 0.75, y: 0.75 }}
                start={{ x: 0, y: 0 }}
                style={CommonStyle.gradient}
            >
                <View style={CommonStyle.container}>
                    <SegmentedControlIOS
                        selectedIndex={this.state.tab}
                        style={CommonStyle.button_group}
                        tintColor={'#494e6B'}
                        values={[ 'Localisation', 'Autre' ]}
                        onChange={this._handle_switch}
                    />
                    <View style={CommonStyle.view}>
                        {this.renderTabChilds()}
                    </View>
                </View>
            </LinearGradient>
        );
    }

}
