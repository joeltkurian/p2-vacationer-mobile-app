import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivitiyView from './complaints-activities-login/activitiy-view';
import ComplaintView from './complaints-activities-login/complaint-view';
import SignInView from './complaints-activities-login/sign-in-view';

export default function App() {
  const [user, setUser] = useState({id: "69420", isAuthenticated: false})

  return (
    <View style={styles.container}>
      
      {!user.isAuthenticated ? <SignInView user={user} updateUser={setUser}/> : 
        <ComplaintView/>
        
      }
      
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
