import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import common from '../common/styles';
import TimePicker from './timepicker';

export default class SettingsPrepareTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            label: 'Temps de preparation',
            time: props.time || new Date()
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            time: props.time || new Date()
        });
    }

    render() {
        return (
            <View style={common.view}>
                <Text style={common.text}>Temps de préparation</Text>
                <TouchableOpacity style={[ common.touchable, styles.touchable ]} onPress={() => this.show()}>
                    <Text style={[ common.text, styles.text ]}>{this.state.time.toLocaleTimeString([ ], { hour: '2-digit', minute:'2-digit' })}</Text>
                </TouchableOpacity>
                <TimePicker visibility={this.state.visibility} time={this.state.time} label={this.state.label} onSubmit={this.updateTime} />
            </View>
        );
    }

    show() {
        this.setState({ visibility: true });
    }

    updateTime = (time) => {
        this.setState({ time, visibility: false });
        this.props.onChange(time);
    };

}

const styles = StyleSheet.create({
    touchable: {
        marginTop: 25
    },
    text: {
        color: '#000'
    }
});
