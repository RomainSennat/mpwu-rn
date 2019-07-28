// NODE MODULES IMPORT
import React from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import PreferencesManager from '../common/preferences-manager';
import { CommonStyle, ToPlaceStyle } from '../common/styles';

export default class ToPlace extends React.Component {
    
    // CONSTRUCTOR
    constructor() {
        super();
        // Default state
        this.state = { to: { display_name: '' } };
        // Bind event handlers to class instance
        this._handle_change = this._handle_change.bind(this);
        this._handle_localize = this._handle_localize.bind(this);
    }
    
    // REACT LIFECYCLES
    async componentDidMount() {
        this.setState({ to: await PreferencesManager.get('to') });
    }
    
    // EVENT HANDLERS
    _handle_change(value) {
        const { to } = this.state;
        to.display_name = value;
        this.setState({ to });
    }
    
    async _handle_localize() {
        try {
            const results = await (await fetch(`https://nominatim.openstreetmap.org/search?q=${this.state.to.display_name}&format=json`)).json();
            const to = {
                display_name: results[0].display_name,
                position: { lat: results[0].lat, lng: results[0].lon }
            };
            this.setState({ to: await PreferencesManager.set('to', to) });
            Alert.alert('Succès', `Les coordonnées GPS de l'adresse saisie sont : ${to.position.lat},${to.position.lng}`);
        } catch (e) {
            Alert.alert('Erreur', 'Impossible de récupérer les coordonnées GPS à partir de l\'adresse saisie.');
        }
    }
    
    // RENDERERS
    render() {
        return (
            <View style={CommonStyle.view}>
                <Text style={CommonStyle.text}>Destination</Text>
                <View style={ToPlaceStyle.inline}>
                    <TextInput
                        placeholder="Adresse de la destination"
                        style={[ CommonStyle.input, ToPlaceStyle.input ]}
                        value={this.state.to.display_name}
                        onChangeText={this._handle_change}
                    />
                    <TouchableOpacity style={[ CommonStyle.button, ToPlaceStyle.button ]} onPress={this._handle_localize}>
                        <Icon containerStyle={ToPlaceStyle.icon} name="my-location" color="#fff" />
                   </TouchableOpacity>
                </View>
            </View>
        );
    }
    
}

