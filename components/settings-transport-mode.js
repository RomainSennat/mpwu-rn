import React from 'react';
import { SegmentedControlIOS, StyleSheet, Text, View } from 'react-native';
import common from '../common/styles';

export default class SettingsTransportMode extends React.Component {

    constructor() {
        super();
        this.state = { mode: 0 }
    }

    componentWillReceiveProps(props) {
        this.setState({ mode: props.mode });
    }

    render() {
        return (
            <View style={common.view}>
                <Text style={common.text}>Moyen de transport</Text>
                <SegmentedControlIOS style={[ common.button_group, styles.button_group ]} values={[ 'Voiture', 'Transport' ]} selectedIndex={this.state.mode} tintColor={'#494e6B'} onChange={(event) => this.changeMode(event)} />
            </View>
        );
    }

    changeMode(event) {
        this.props.onChange(event.nativeEvent.selectedSegmentIndex);
    }

}

const styles = StyleSheet.create({
    button_group: {
        marginTop: 25
    }
});
