import React from 'react';
import { Alert, SegmentedControlIOS, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import common from '../common/styles';
import { SETTINGS_UPDATE } from '../redux/actions/settings';
import SettingsLocationPage from './settings-location-page';
import SettingsOthersPage from './settings-others-page';

const Datastore = require('react-native-local-mongodb');

const db = new Datastore({ filename: 'configuration', autoload: true });

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current_page: 0,
            prepare_time: new Date(),
            destination: {
                coord: { lat: 0, lng: 0 },
                formatted: ''
            },
            url: '',
            mode: 1
        };
    }

    async componentDidMount() {
        const datas = await db.findOneAsync({ }, { _id: 0 });
        if (datas) {
            const { prepare_time, destination, url, mode } = datas;
            this.props.updateSettings({ prepare_time, destination, url, mode });
        }
    }

    componentWillReceiveProps(props) {
        this.setState(props);
    }

    render() {
        return (
            <LinearGradient style={common.gradient} colors={[ '#985e6d', '#494e6B' ]} start={{ x: 0, y: 0 }} end={{ x: 0.75, y: 0.75 }}>
                <View style={common.container}>
                    <SegmentedControlIOS style={common.button_group} values={[ 'Localisation', 'Autre' ]} selectedIndex={this.state.current_page} tintColor={'#494e6B'} onChange={(event) => this.changePage(event)} />
                    {(this.state.current_page === 0) ? <SettingsLocationPage onUpdate={this.updateState} destination={this.state.destination} mode={this.state.mode} /> : <SettingsOthersPage onUpdate={this.updateState} prepareTime={this.state.prepare_time} url={this.state.url} />}
                    <TouchableOpacity style={common.button} onPress={() => this.save()}>
                        <Text style={common.text}>Sauvegarder</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    async changePage(event) {
        this.setState({ current_page: event.nativeEvent.selectedSegmentIndex });
        const { prepare_time, destination, url, mode } = await db.findOneAsync({ }, { _id: 0 });
        this.props.updateSettings({ prepare_time, destination, url, mode });
    }

    save() {
        const { prepare_time, start_place, destination, url, mode } = this.state;
        db.count({ }, (error, count) => {
            if (count === 0) {
                db.insert({ prepare_time, start_place, destination, url, mode });
            }
            else {
                db.update({ }, { $set: { prepare_time, start_place, destination, url, mode } });
            }
            Alert.alert('Sauvegarde effectuée');
        });
    }

    updateState = (state) => {
        this.props.updateSettings(state);
    };

}

const mapStateToProps = (state) => {
    const { prepare_time, url, start_place, destination, mode } = state.settings;
    return { prepare_time, url, start_place, destination, mode };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSettings: (payload) => dispatch({ type: SETTINGS_UPDATE, payload })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
