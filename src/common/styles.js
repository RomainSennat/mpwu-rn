import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
    button: {
        backgroundColor: '#985e6d',
        borderColor: '#424242',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        paddingVertical: 10,
        width: '70%'
    },
    button_group: {
        backgroundColor: '#ffffff',
        borderColor: '#494e6b',
        borderRadius: 5,
        height: 30,
        marginBottom: 20,
        width: '80%'
    },
    container: { alignItems: 'center', flex: 1, justifyContent: 'space-between', paddingVertical: 25 },
    gradient: { flex: 1 },
    header: { backgroundColor: '#985e6d' },
    header_title: { color: '#ffffff' },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontFamily: 'Baloo',
        height: 30,
        marginTop: 25,
        padding: 4,
        width: '70%'
    },
    tab_bar: { backgroundColor: '#494e6B', borderColor: '#494e6B', borderTopWidth: 1 },
    tab_bar_active: { backgroundColor: '#2e3347' },
    tab_bar_icon: { height: 25, width: 25 },
    tab_bar_inactive: { backgroundColor: '#494e6B' },
    text: { color: '#fff', fontFamily: 'Baloo', textAlign: 'center' },
    touchable: { backgroundColor: '#fff', borderRadius: 5, height: 30, padding: 4, width: '70%' },
    view: { alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }
});
const day = styles = StyleSheet.create({
    day: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
    text: { color: '#000000' },
    title: { color: '#ffffff' },
    touchable: { width: '60%' }
});
const from_place = StyleSheet.create({
    button: { marginTop: 25 }
});
const home = StyleSheet.create({
    activity: {
        borderColor: '#424242',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '70%'
    },
    alarm_hour: {
        backgroundColor: '#494e6b',
        borderColor: '#424242',
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        fontSize: 40,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 40
    },
    alarm_hour_text: { paddingBottom: 20 },
    text: { color: '#000' }
});
const prepare_time = StyleSheet.create({
    text: { color: '#000' },
    touchable: { marginTop: 25 }
});
const timepicker = StyleSheet.create({
    title: {
        borderColor: '#494e6b',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 3,
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        width: '100%'
    },
    buttons: { flexDirection: 'row' },
    button: { backgroundColor: '#494e6b', marginHorizontal: 5, width: '45%' },
    content: {
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
        borderColor: '#424242',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    timepicker: {
        borderColor: '#494e6b',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 3,
        marginVertical: 20,
        width: '100%'
    }
});
const to_place = StyleSheet.create({
    button: { alignItems: 'center', aspectRatio: 1, justifyContent: 'center', width: '15%' },
    icon: { aspectRatio: 1, height: 30 },
    inline: { alignItems: 'center', flex: 1, flexDirection: 'row', height: 30, justifyContent: 'center', width: '80%' },
    input: { marginRight: '5%', marginTop: 0, width: '65%' }
});
const transport_mode = StyleSheet.create({
    button_group: { marginTop: 25 }
});

export const CommonStyle = common;
export const DayStyle = day;
export const FromPlaceStyle = from_place;
export const HomeStyle = home;
export const PrepareTimeStyle = prepare_time;
export const TimePickerStyle = timepicker;
export const ToPlaceStyle = to_place;
export const TransportModeStyle = transport_mode;
