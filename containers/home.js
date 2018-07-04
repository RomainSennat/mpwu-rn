import React from 'react';
import { InteractionManager, PushNotificationIOS, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import common from '../common/styles';

const Sound = require('react-native-sound');

export default class Home extends React.Component {

    sound = null;

    constructor() {
        super();
        this.state = { disabled: true };
    }

    async componentDidMount() {
        PushNotification.configure({
            onNotification: (notification) => notification.finish(PushNotificationIOS.FetchResult.NoData),
            popInitialNotification: true
        });
        /*
         *Call APIs and get time before play sound
         * [...]
         */
        const now = new Date();
        const start = new Date();
        start.setMinutes(start.getMinutes() + 1);
        const format = { weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' };
        PushNotification.localNotification({ message: `L'alarme sonnera ${start.toLocaleString('fr-FR', format)}` });
        // Delay notification/play sound
        PushNotification.localNotificationSchedule({ message: 'Reveil toi !', date: start });
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.setState({ disabled: false });
                this.play();
            }, start.getTime() - now.getTime());
        });
    }

    render() {
        return (
            <LinearGradient style={common.gradient} colors={[ '#985e6d', '#494e6B' ]} start={{ x: 0, y: 0 }} end={{ x: 0.75, y: 0.75 }}>
                <View style={common.container}>
                    <View style={styles.activity}>
                        <Text style={[ common.text, styles.text ]}>9:00</Text>
                        <Text style={[ common.text, styles.text ]}>Cours de JAVA</Text>
                    </View>
                    <View>
                        <Text style={[ common.text, styles.alarm_hour_text ]}>Votre reveil est programmé pour :</Text>
                        <Text style={[ common.text, styles.alarm_hour ]}>7h35</Text>
                    </View>
                    <TouchableOpacity style={common.button} disabled={this.state.disabled} onPress={() => this.stop()}>
                        <Text style={common.text}>Stop</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    play() {
        Sound.setCategory('Playback', true);
        this.sound = new Sound('sound.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                return;
            }
            this.sound.setVolume(1);
            this.sound.setNumberOfLoops(-1);
            this.sound.play((success) => {
                if (!success) {
                    this.sound.reset();
                }
            });
        });
    }

    stop() {
        this.setState({ disabled: true });
        this.sound.stop(() => {
            this.sound.release();
        });
    }

}

const styles = StyleSheet.create({
    alarm_hour: {
        overflow: 'hidden',
        backgroundColor: '#494e6B',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#424242',
        padding: 40,
        borderRadius: 20,
        fontSize: 40,
        fontWeight: 'bold'
    },
    alarm_hour_text: {
        paddingBottom: 20
    },
    activity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#424242',
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '70%'
    },
    text: {
        color: '#000'
    }
});
