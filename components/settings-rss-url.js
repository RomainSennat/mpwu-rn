import React from 'react';
import { Text, TextInput, View } from 'react-native';
import common from '../common/styles';

export default class SettingsRssUrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            label: 'Temps de preparation',
            value: props.value
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value });
    }

    render() {
        return (
            <View style={common.view}>
                <Text style={common.text}>Adresse du flux RSS de l'IUT</Text>
                <TextInput style={common.input} placeholder={'http(s)://www.dommaine.com'} keyboardType={'url'} value={this.state.value} onSubmitEditing={(event) => this.submit(event.nativeEvent.text)} />
            </View>
        );
    }

    submit(value) {
        this.props.onChange(value);
    }

}
