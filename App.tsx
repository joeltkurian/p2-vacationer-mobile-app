import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import ActivityView from './components/activity-view';
import ComplaintView from './components/complaint-view';
import RoomServiceComponent from './components/room-service/room-service-container';
import SignInView from './components/sign-in-view';

export default function App() {
  const [user, setUser] = useState({ id: "69420", isAuthenticated: false })

  return (
    <ImageBackground resizeMode='cover' style={styles.backgroundImage} source={{uri:"https://specialspectacleimg.blob.core.windows.net/continentalimgs/backgroundContinental.jpg"}}>
      <View style={styles.container}>
    
        {!user.isAuthenticated ? <SignInView user={user} updateUser={setUser} /> :
          // <ActivityView/>
          <RoomServiceComponent userId={user.id}/>
        }
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex:1, 
    backgroundColor:'red',
    justifyContent:'center'
  }
});