import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivitiyView from './components/activitiy-view';
import SignInView from './components/sign-in-view';

export default function App() {
  const [user, setUser] = useState({id: "69420", isAuthenticated: false})

  return (
    <View style={styles.container}>
      
      {!user.isAuthenticated ? <SignInView user={user} updateUser={setUser}/> : 
        <ActivitiyView/>}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
