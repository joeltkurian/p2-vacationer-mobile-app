import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ActivityView from './components/activity-view';
import ComplaintView from './components/complaint-view';
import SignInView from './components/sign-in-view';

export default function App() {
  const [user, setUser] = useState({ id: "69420", isAuthenticated: false })


  {/* For complaint view: <ComplaintView/> */ }
  return (
    <View style={styles.container}>
      {!user.isAuthenticated ? <SignInView user={user} updateUser={setUser} /> :
        <ActivityView />
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
  }
});