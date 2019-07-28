// NODE MODULES IMPORT
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CommonStyle, DayStyle } from '../common/styles';

export default class Day extends React.Component {
    
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        // Bind event handlers to class instance
        this._handle_open = this._handle_open.bind(this);
    }
    
    // EVENT HANDLERS
    _handle_open() {
        this.props.onTouch(this.props.label);
    }
    
    // RENDERERS
    render() {
        const format = { hour: '2-digit', minute: '2-digit' };
        return (
            <View style={DayStyle.day}>
                <Text style={DayStyle.title}>{this.props.label}</Text>
                <TouchableOpacity style={[ CommonStyle.touchable, DayStyle.touchable ]} onPress={this._handle_open}>
                    <Text style={[ CommonStyle.text, DayStyle.text ]}>
                        {new Date(this.props.time).toLocaleTimeString([ 'fr-FR' ], format)}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}

// PROP TYPES EXPECTED
Day.propTypes = {
    label: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    onTouch: PropTypes.func.isRequired
};

// DEFAULT PROP TYPES
Day.defaultProps = { };
