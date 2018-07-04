import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import common from '../common/styles';

export default class CalendarDay extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.day}>
                <Text style={styles.day_title}>{this.props.label}</Text>
                <TouchableOpacity style={[ common.touchable, styles.touchable ]} onPress={() => this.props.onTouch(this.props.label, this.props.index)}>
                    <Text style={[ common.text, styles.text ]}>{this.props.time.toLocaleTimeString([ ], { hour: '2-digit', minute:'2-digit' })}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    day: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'
    },
    day_title: {
        color: '#fff'
    },
    touchable: {
        width: '60%'
    },
    text: {
        color: '#000'
    }
});
