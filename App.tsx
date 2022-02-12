import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import HomePage from './components/homepage';
import SignInView from './components/sign-in-view';
import { Reservation } from './dtos';
import { initialReservation, userContext } from './userContext';

export default function App() {
  const [user, setUser] = useState<Reservation>(initialReservation);

  useEffect(() => {
    AsyncStorage.getItem('user').then(json => {
      if (json) {
        setUser(JSON.parse(json));
      }
    });
  }, []);

  return (
    <ImageBackground resizeMode='cover' style={styles.backgroundImage} source={{ uri: "https://specialspectacleimg.blob.core.windows.net/continentalimgs/backgroundContinental.jpg" }}>
      <View style={styles.container}>
        {user && user.id === '' ?
          <SignInView updateUser={setUser} />
          :
          <userContext.Provider value={{ user, setUser }}>
            <HomePage />
          </userContext.Provider>
        }
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
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center'
  }
});