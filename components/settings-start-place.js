import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import common from '../common/styles';

export default class SettingsStartPlace extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={common.view}>
                <Text style={common.text}>Départ</Text>
                <TouchableOpacity style={[ common.button, styles.button ]} onPress={() => this.localize()}>
                    <Text style={common.text}>Se géolocaliser</Text>
                </TouchableOpacity>
            </View>
        );
    }

    localize() {
        navigator.geolocation.requestAuthorization();
        navigator.geolocation.getCurrentPosition(async ({ coords }) => this._handleGetPositionSuccess(coords), (err) => this._handleGetPositionError(err), { enableHighAccuracy: true });
    }

    async _handleGetPositionSuccess(coords) {
        const { latitude, longitude } = coords;
        this.props.onLocalize({ lat: latitude, lng: longitude });
        const { results } = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=AIzaSyBozdws9gbV77gwIu9jSVlthYFO424M9yo`)).json();
        const { formatted_address } = results.shift();
        Alert.alert('Nous vous avons localisé ici :', formatted_address);
    }

    _handleGetPositionError(err) {
        Alert.alert('Erreur', err.message);
    }

}

const styles = StyleSheet.create({
    button: {
        marginTop: 25
    }
});
