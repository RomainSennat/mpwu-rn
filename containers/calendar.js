import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import common from '../common/styles';
import CalendarDay from '../components/calendar-day';
import TimePicker from '../components/timepicker';
import { CALENDAR_UPDATE } from '../redux/actions/calendar';

const Datastore = require('react-native-local-mongodb');

const db = new Datastore({ filename: 'configuration', autoload: true });
const days = [ 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche' ];

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        const now = new Date();
        this.state = {
            visibility: false,
            index: 0,
            times: days.map(() => new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0))
        };
    }

    async componentDidMount() {
        const datas =  await db.findOneAsync({ }, { _id: 0 });
        if (datas) {
            const { times } = datas;
            if (times) {
                this.props.updateTimes({ times });
            }
        }
    }

    componentWillReceiveProps(props) {
        this.setState(props);
    }

    render() {
        return (
            <LinearGradient style={common.gradient} colors={[ '#985e6d', '#494e6B' ]} start={{ x: 0, y: 0 }} end={{ x: 0.75, y: 0.75 }}>
                <View style={common.container}>
                    {days.map((day, index) => <CalendarDay key={index} label={day} time={this.state.times[index]} index={index} onTouch={this.showTimePicker} />)}
                    <TouchableOpacity style={common.button} onPress={() => this.save()}>
                        <Text style={common.text}>Sauvegarder</Text>
                    </TouchableOpacity>
                    <TimePicker visibility={this.state.visibility} time={this.state.times[this.state.index]} label={this.state.label} onSubmit={this.updateTime} />
                </View>
            </LinearGradient>
        );
    }

    save() {
        const { times } = this.state;
        db.count({ }, (error, count) => {
            if (count === 0) {
                db.insert({ times });
            }
            else {
                db.update({ }, { $set: { times } });
            }
            Alert.alert('Sauvegarde effectuée');
        });
    }

    showTimePicker = (label, index) => {
        this.setState({ label, index, visibility: true });
    };

    updateTime = (time) => {
        const { times, index } = this.state;
        times[index] = time;
        this.props.updateTimes({ times });
        this.setState({ visibility: false });
    };

}

const mapStateToProps = (state) => {
    return {
       times: state.calendar.times
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTimes: (payload) => dispatch({ type: CALENDAR_UPDATE, payload })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
