import React from 'react';
import { View } from 'react-native';
import common from '../common/styles';
import SettingsPrepareTime from '../components/settings-prepare-time';
import SettingsRssUrl from '../components/settings-rss-url';

export default class SettingsOthersPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { prepare_time: new Date() };
    }

    componentWillReceiveProps(props) {
        const { url, prepareTime } = props;
        this.setState({ url, prepare_time: prepareTime });
    }

    render() {
        return (
            <View style={common.view}>
                <SettingsRssUrl value={this.state.url} onChange={this.updateUrl} />
                <SettingsPrepareTime time={this.state.prepare_time} onChange={this.updatePrepareTime} />
            </View>
        );
    }

    updatePrepareTime = (prepare_time) => {
        this.props.onUpdate({ prepare_time });
    };

    updateUrl = (url) => {
        this.props.onUpdate({ url });
    };

}
