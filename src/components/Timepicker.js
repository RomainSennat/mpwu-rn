// NODE MODULES IMPORT
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DatePickerIOS, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { CommonStyle, TimePickerStyle } from '../common/styles';

export default class Timepicker extends Component {
    
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        this.time = now;
        // Bind event handlers to class instance
        this._handle_cancel = this._handle_cancel.bind(this);
        this._handle_change = this._handle_change.bind(this);
        this._handle_validate = this._handle_validate.bind(this);
    }
    
    // EVENT HANDLERS
    _handle_change(time) {
        this.time = time;
    }
    
    _handle_cancel() {
        this.props.onCancel();
    }
    
    _handle_validate() {
        this.props.onSubmit(this.time);
    }
    
    // RENDERERS
    render() {
        return (
            <View>
                <Modal isVisible={this.props.visibility}>
                    <View style={TimePickerStyle.content}>
                        <Text style={TimePickerStyle.title}>{this.props.label}</Text>
                        <DatePickerIOS
                            date={this.props.time}
                            locale="fr-FR"
                            mode="time"
                            style={TimePickerStyle.timepicker}
                            onDateChange={this._handle_change}
                        />
                        <View style={TimePickerStyle.buttons}>
                            <TouchableOpacity style={[ CommonStyle.button, TimePickerStyle.button ]} onPress={this._handle_cancel}>
                                <Text style={CommonStyle.text}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[ CommonStyle.button, TimePickerStyle.button ]} onPress={this._handle_validate}>
                                <Text style={CommonStyle.text}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

// PROP TYPES EXPECTED
Timepicker.propTypes = {
    label: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    visibility: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

// DEFAULT PROP TYPES
Timepicker.defaultProps = {
    visibility: false
};
