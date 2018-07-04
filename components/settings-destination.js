import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import common from '../common/styles';

export default class SettingsDestination extends React.Component {

    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    componentWillReceiveProps(props) {
        this.setState({ address: props.address });
    }

    render() {
        return (
            <View style={common.view}>
                <Text style={common.text}>Destination</Text>
                <View style={styles.inline}>
                    <TextInput style={[ common.input, styles.input ]} value={this.state.address} placeholder={'Adresse de la destination'} onChangeText={(text) => this.setState({ address: text })} />
                    <TouchableOpacity style={[ common.button, styles.button ]} onPress={() => this.localize()}>
                        <Icon containerStyle={styles.icon} name='my-location' color='#fff' />
                   </TouchableOpacity>
                </View>
            </View>
        );
    }

    async localize() {
        const { results } = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=AIzaSyBozdws9gbV77gwIu9jSVlthYFO424M9yo`)).json();
        const { formatted_address } = results[0];
        const { lat, lng } = results[0].geometry.location;
        Alert.alert('Les coordonnées GPS de l\'adresse saisie sont :', `${lat},${lng}`);
        this.props.onLocalize({ coord: { lat, lng }, formatted: formatted_address });
    }

}

const styles = StyleSheet.create({
    button: {
        width: '15%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inline: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 30
    },
    input: {
        width: '65%',
        marginRight: '5%',
        marginTop: 0
    },
    icon: {
        height: 30,
        aspectRatio: 1
    }
});
