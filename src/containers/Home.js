// NODE MODULES IMPORT
import React from 'react';
import { InteractionManager, PushNotificationIOS, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';
import { CommonStyle, HomeStyle } from '../common/styles';

export default class Home extends React.Component {
    
    sound = null;
    
    // CONSTRUCTOR
    constructor() {
        super();
        // Default state
        this.state = { disabled: true };
        // Bind event handlers to class instance
        this._handle_stop = this._handle_stop.bind(this);
    }
    
    // REACT LIFECYCLES
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
        start.setMinutes(start.getMinutes() + 1, 0, 0);
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
    
    // EVENT HANDLERS
    _handle_stop() {
        this.setState({ disabled: true });
        this.sound.stop(() => this.sound.release());
    }
    
    // HELPERS
    play() {
        Sound.setCategory('Playback', true);
        this.sound = new Sound('https://raw.githubusercontent.com/RomainSennat/mpwu-rn/master/assets/sound.wav', null, (error) => {
            if (error) { return; }
            this.sound.setVolume(1);
            this.sound.setNumberOfLoops(-1);
            this.sound.play((success) => {
                if (!success) { this.sound.reset(); }
            });
        });
    }
    
    // RENDERERS
    render() {
        return (
            <LinearGradient
                colors={[ '#985e6d', '#494e6b' ]}
                end={{ x: 0.75, y: 0.75 }}
                start={{ x: 0, y: 0 }}
                style={CommonStyle.gradient}
            >
                <View style={CommonStyle.container}>
                    <View style={HomeStyle.activity}>
                        <Text style={[ CommonStyle.text, HomeStyle.text ]}>9:00</Text>
                        <Text style={[ CommonStyle.text, HomeStyle.text ]}>Cours de JAVA</Text>
                    </View>
                    <View>
                        <Text style={[ CommonStyle.text, HomeStyle.alarm_hour_text ]}>Votre reveil est programmé pour :</Text>
                        <Text style={[ CommonStyle.text, HomeStyle.alarm_hour ]}>7h35</Text>
                    </View>
                    <TouchableOpacity disabled={this.state.disabled} style={CommonStyle.button} onPress={this._handle_stop}>
                        <Text style={CommonStyle.text}>Stop</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
    
}
