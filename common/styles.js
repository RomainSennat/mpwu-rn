import { StyleSheet } from 'react-native';

export default common = StyleSheet.create({
    button: {
        backgroundColor: '#985e6d',
        width: '70%',
        paddingVertical: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#424242',
        borderRadius: 10
    },
    button_group: {
        borderRadius: 5,
        borderColor: '#494e6B',
        width: '80%',
        height: 30,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25
    },
    gradient: {
        flex: 1
    },
    header: {
        backgroundColor: '#985e6d'
    },
    header_title: {
        color: '#fff'
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 30,
        width: '70%',
        padding: 4,
        marginTop: 25,
        fontFamily: 'Baloo'
    },
    tab_bar: {
        borderTopWidth: 1,
        borderColor: '#494e6B',
        backgroundColor: '#494e6B'
    },
    tab_bar_active: {
        backgroundColor: '#2e3347'
    },
    tab_bar_icon: {
        height: 25,
        width: 25
    },
    tab_bar_inactive: {
        backgroundColor: '#494e6B'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Baloo'
    },
    touchable: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 30,
        width: '70%',
        padding: 4
    },
    view: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    }
});
