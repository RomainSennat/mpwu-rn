// NODE MODULES IMPORT
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PreferencesManager from '../common/preferences-manager';
import { CommonStyle, PrepareTimeStyle } from '../common/styles';
import Timepicker from './Timepicker';

export default class PrepareTime extends React.Component {
    
    // CONSTRUCTOR
    constructor() {
        super();
        // Default state
        this.state = { prepare_time: new Date() };
        // Bind event handlers to class instance
        this._handle_toggle = this._handle_toggle.bind(this);
        this._handle_update = this._handle_update.bind(this);
    }
    
    // REACT LIFECYCLES
    async componentDidMount() {
        this.setState({ prepare_time: new Date(await PreferencesManager.get('prepare_time')) });
    }
    
    // EVENT HANDLERS
    _handle_toggle() {
        this.setState({ visibility: !this.state.visibility });
    }
    
    async _handle_update(prepare_time) {
        this.setState({ prepare_time: await PreferencesManager.set('prepare_time', prepare_time), visibility: false });
    };
    
    // RENDERERS
    render() {
        const format = { hour: '2-digit', minute: '2-digit' };
        return (
            <View style={CommonStyle.view}>
                <Text style={CommonStyle.text}>Temps de préparation</Text>
                <TouchableOpacity style={[ CommonStyle.touchable, PrepareTimeStyle.touchable ]} onPress={this._handle_toggle}>
                    <Text style={[ CommonStyle.text, PrepareTimeStyle.text ]}>
                        {this.state.prepare_time.toLocaleTimeString([ 'fr-FR' ], format)}
                    </Text>
                </TouchableOpacity>
                <Timepicker
                    label="Temps de préparation"
                    time={this.state.prepare_time}
                    visibility={this.state.visibility}
                    onCancel={this._handle_toggle}
                    onSubmit={this._handle_update}
                />
            </View>
        );
    }
    
}
