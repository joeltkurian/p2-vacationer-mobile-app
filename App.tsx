import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RoomServiceComponent from './room-service/room-service-container';

export default function App() {
  return (
    <View>
      <RoomServiceComponent/>
    </View>
  );
}
