import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

// Application preferences management
export default class PreferencesManager {
    
    // Get value for key
    static async get(key) {
        const value = await AsyncStorage.getItem(`@${key}`);
        try {
            return JSON.parse(value);
        } catch (e) { return value; }
    }
    
    // Init settings
    static async init() {
        // Check if settings does not exists
        if ((await AsyncStorage.getAllKeys()).length !== 0) { return; }
        // Set default settings
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        await PreferencesManager.set('from', { position: { lat: 0, lng: 0 }, display_name: '' });
        await PreferencesManager.set('to', { position: { lat: 0, lng: 0 }, display_name: '' });
        await PreferencesManager.set('rss_url', '');
        await PreferencesManager.set('transport_mode', 0);
        await PreferencesManager.set('prepare_time', now);
        await PreferencesManager.set('week_times', new Array(7).fill(now, 0, 7));
    }
    
    // Set value for key
    static async set(key, value) {
        try {
            await AsyncStorage.setItem(`@${key}`, typeof value === 'string' ? value : JSON.stringify(value));
        } catch (e) {
            Alert.alert('Error', e.message);
        }
        return await PreferencesManager.get(key);
    }
    
    // Set value for key only if does not exists
    static async setIfNull(key, value) {
        try {
            if (!(await PreferencesManager.get(key))) {
                return await PreferencesManager.set(key, value);
            }
        } catch (e) {
            Alert.alert('Error', e.message);
            return null;
        }
    }
    
}
