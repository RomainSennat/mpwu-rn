import React from 'react';
import { View } from 'react-native';
import common from '../common/styles';
import SettingsDestination from '../components/settings-destination';
import SettingsStartPlace from '../components/settings-start-place';
import SettingsTransportMode from '../components/settings-transport-mode';

export default class SettingsLocationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { address: '', mode: 0 };
    }

    componentWillReceiveProps(props) {
        const { mode, destination } = props;
        this.setState({
            address: (destination) ? destination.formatted || '' : '',
            mode: mode || 0
        });
    }

    render() {
        return (
            <View style={common.view}>
                <SettingsStartPlace onLocalize={this.updateStartPlace} />
                <SettingsDestination onLocalize={this.updateDestination} address={this.state.address} />
                <SettingsTransportMode onChange={this.updateMovingMode} mode={this.state.mode} />
            </View>
        );
    }

    updateDestination = (destination) => {
        this.props.onUpdate({ destination });
    };

    updateMovingMode = (mode) => {
        this.props.onUpdate({ mode });
    };

    updateStartPlace = (coord) => {
        this.props.onUpdate({ start_place: coord });
    };

}
