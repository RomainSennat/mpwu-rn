import React, { Component } from 'react';
import { DatePickerIOS, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import common from '../common/styles';

export default class TimePicker extends Component {

    constructor(props) {
        super(props);
        const now = new Date();
        this.state = {
            visibility: props.visibility,
            label: props.label,
            time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ visibility: props.visibility, label: props.label, time: props.time });
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.state.visibility}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{this.state.label}</Text>
                        <DatePickerIOS style={styles.timepicker} date={this.state.time} mode={'time'} onDateChange={(value) => this.updateTime(value)} />
                        <View style={styles.buttons}>
                            <TouchableOpacity style={[common.button, styles.button]} onPress={() => this.hideModal()}>
                                <Text style={common.text}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[common.button, styles.button]} onPress={() => this.validate()}>
                                <Text style={common.text}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    hideModal() {
        this.setState({ visibility: false });
    }

    updateTime(time) {
        this.setState({ time });
    }

    validate() {
        this.props.onSubmit(this.state.time);
    }
}

const styles = StyleSheet.create({
    title: {
        width: '100%',
        padding: 10,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#494e6B',
        borderRadius: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Baloo'
    },
    buttons: {
        flexDirection: 'row'
    },
    button: {
        width: '45%',
        marginHorizontal: 5,
        backgroundColor: '#494e6B'
    },
    content: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#424242',
        borderRadius: 5,
        backgroundColor: '#e5e5e5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25
    },
    timepicker: {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#494e6B',
        borderRadius: 5,
        marginVertical: 20,
        width: '100%'
    }
});
