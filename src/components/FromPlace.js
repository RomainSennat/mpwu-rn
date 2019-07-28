// NODE MODULES IMPORT
import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import PreferencesManager from '../common/preferences-manager';
import { CommonStyle, FromPlaceStyle } from '../common/styles';

export default class FromPlace extends React.Component {
    
    // CONSTRUCTOR
    constructor() {
        super();
        // Bind event handlers to class instance
        this._handle_localize = this._handle_localize.bind(this);
        this._handle_location_error = this._handle_location_error.bind(this);
        this._handle_location_success = this._handle_location_success.bind(this);
    }
    
    // EVENT HANDLERS
    _handle_localize() {
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(async ({ coords }) => this._handle_location_success(coords), (err) => this._handle_location_error(err), { enableHighAccuracy: true });
    }
    
    async _handle_location_success(coords) {
        try {
            const result = await (await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`)).json();
            const from = {
                display_name: result.display_name,
                position: { lat: result.lat, lng: result.lon }
            };
            await PreferencesManager.set('from', from);
            Alert.alert('Nous vous avons localisé ici :', from.display_name);
        } catch (e) {
            Alert.alert('Erreur', 'Impossible de récupérer l\'adresse à partir des coordonnées GPS.');
        }
    }
    
    _handle_location_error(err) {
        Alert.alert('Erreur', 'Erreur lors de la géolocalisation.');
    }
    
    // RENDERERS
    render() {
        return (
            <View style={CommonStyle.view}>
                <Text style={CommonStyle.text}>Départ</Text>
                <TouchableOpacity style={[ CommonStyle.button, FromPlaceStyle.button ]} onPress={this._handle_localize}>
                    <Text style={CommonStyle.text}>Se géolocaliser</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}
