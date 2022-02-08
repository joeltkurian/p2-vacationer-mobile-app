import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivitiyView from './complaints-activities-login/activitiy-view';
import SignInView from './complaints-activities-login/sign-in-view';
import RoomServiceComponent from './components/room-service/room-service-container';


export default function App() {
  const [user, setUser] = useState({id: "69420", isAuthenticated: false})


  {/* For complaint view: <ComplaintView/> */}
  return (
    <View style={styles.container}>
      {!user.isAuthenticated ? <SignInView user={user} updateUser={setUser}/> : 
        <ActivitiyView/>
      }
      <StatusBar style="auto" />
    </View>
  );
}
