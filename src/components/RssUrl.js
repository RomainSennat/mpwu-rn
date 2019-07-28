// NODE MODULES IMPORT
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import PreferencesManager from '../common/preferences-manager';
import { CommonStyle } from '../common/styles';

export default class RssUrl extends React.Component {
    
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        // Default state
        this.state = { };
        // Bind event handlers to class instance
        this._handle_change = this._handle_change.bind(this);
        this._handle_submit = this._handle_submit.bind(this);
    }
    
    // REACT LIFECYCLES
    async componentDidMount() {
        this.setState({ rss_url: await PreferencesManager.get('rss_url') });
    }
    
    // EVENT HANDLERS
    _handle_change(value) {
        this.setState({ rss_url: value });
    }
    
    async _handle_submit({ nativeEvent }) {
        await PreferencesManager.set('rss_url', nativeEvent.text.trim());
    }
    
    // RENDERERS
    render() {
        return (
            <View style={CommonStyle.view}>
                <Text style={CommonStyle.text}>Adresse du flux RSS de l'IUT</Text>
                <TextInput
                    keyboardType="url"
                    placeholder="http(s)://www.domaine.com"
                    style={CommonStyle.input}
                    value={this.state.rss_url}
                    onChangeText={this._handle_change}
                    onSubmitEditing={this._handle_submit}
                />
            </View>
        );
    }
    
}
