// NODE MODULES IMPORT
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PreferencesManager from '../common/preferences-manager';
import { CommonStyle } from '../common/styles';
import Day from '../components/Day';
import Timepicker from '../components/Timepicker';

const days = [ 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche' ];

export default class Week extends React.Component {
    
    // CONSTRUCTOR
    constructor() {
        super();
        // Default state
        this.state = { visibility: false, label: days[0] };
        // Bind event handlers to class instance
        this._handle_close = this._handle_close.bind(this);
        this._handle_picker = this._handle_picker.bind(this);
        this._handle_update = this._handle_update.bind(this);
    }
    
    // REACT LIFECYCLES
    async componentDidMount() {
        this.setState({ week_times: (await PreferencesManager.get('week_times')).map(el => new Date(el)) });
    }
    
    // EVENT HANDLERS
    _handle_close() {
        this.setState({ visibility: false });
    }
    
    _handle_picker(label) {
        this.setState({ label, visibility: true });
    }
    
    async _handle_update(time) {
        const { week_times } = this.state;
        week_times[days.indexOf(this.state.label)] = time;
        await PreferencesManager.set('week_times', week_times);
        this.setState({ visibility: false });
    }
    
    // RENDERERS
    renderDays() {
        if (!this.state.week_times) {
            return null;
        }
        return days.map((day, index) => (
            <Day
                key={day}
                label={day}
                time={this.state.week_times[index]}
                onTouch={this._handle_picker}
            />
        ));
    }
    
    renderPicker() {
        if (!this.state.week_times) {
            return null;
        }
        return (
            <Timepicker
                label={this.state.label}
                time={this.state.week_times[days.indexOf(this.state.label)]}
                visibility={this.state.visibility}
                onCancel={this._handle_close}
                onSubmit={this._handle_update}
            />
        );
    }
    
    render() {
        return (
            <LinearGradient
                colors={[ '#985e6d', '#494e6b' ]}
                end={{ x: 0.75, y: 0.75 }}
                start={{ x: 0, y: 0 }}
                style={CommonStyle.gradient}
            >
                <View style={CommonStyle.container}>
                    {this.renderDays()}
                </View>
                {this.renderPicker()}
            </LinearGradient>
        );
    }
    
}
