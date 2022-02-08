import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInView(){
    const [id, setID] = useState("")  
    
    
    function login(){
        //make an actual login request
        //setUser instead of setID
    }

    return(<View style={styles.container}>
        <Text>Sign in with your ID:</Text>
        <TextInput style={{backgroundColor:'#eeffee'}} onChangeText={t=>setID(t)}></TextInput>
        <Text> </Text>
        <TouchableOpacity onPress={login}>
            <View style={styles.viewbutton}>Login</View>
        </TouchableOpacity>
        <Text> </Text> <Text> </Text>
        <Text>Your ID is: ${id}</Text>
    </View>);

}

const styles = StyleSheet.create({
    container: {
      flex: .3,
      backgroundColor: '#ffeeff',
      justifyContent: 'center',
      paddingRight: 20,    
      paddingLeft: 20,
    },
    viewbutton: {
        backgroundColor: '#abcdef'
    }
  });
  