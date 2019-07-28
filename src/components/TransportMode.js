// NODE MODULES IMPORT
import React from 'react';
import { SegmentedControlIOS, Text, View } from 'react-native';
import PreferencesManager from '../common/preferences-manager';
import { CommonStyle, TransportModeStyle } from '../common/styles';

export default class TransportMode extends React.Component {
    
    // CONSTRUCTOR
    constructor() {
        super();
        this.state = { transport_mode: 0 };
        // Bind event handlers to class instance
        this._handle_change = this._handle_change.bind(this);
    }
    
    // REACT LIFECYCLES
    async componentDidMount() {
        this.setState({ transport_mode: await PreferencesManager.get('transport_mode') });
    }
    
    // EVENT HANDLERS
    async _handle_change({ nativeEvent }) {
        await PreferencesManager.set('transport_mode', nativeEvent.selectedSegmentIndex);
    }
    
    // RENDERERS
    render() {
        return (
            <View style={CommonStyle.view}>
                <Text style={CommonStyle.text}>Moyen de transport</Text>
                <SegmentedControlIOS
                    selectedIndex={this.state.transport_mode}
                    style={[ CommonStyle.button_group, TransportModeStyle.button_group ]}
                    tintColor="#494e6B"
                    values={[ 'Voiture', 'RATP/SNCF' ]}
                    onChange={this._handle_change}
                />
            </View>
        );
    }
    
}
