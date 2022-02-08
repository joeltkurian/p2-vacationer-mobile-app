import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInView(props:{user:{id:String,isAuthenticated:Boolean}, updateUser:Function}){
    const [id, setID] = useState("")  
    
    
    function signin(){
        //make an actual login request
        //setUser instead of setID
        let isAuth = false;

        if(id === "69420") 
            isAuth = true
        
            props.updateUser({id:id,isAuthenticated:isAuth})
    }

    return(<View style={styles.container}>
        <Text style={styles.header}>Sign in with your ID:{"\n\n"}</Text>
        <TextInput style={{backgroundColor:'#eeffee'}} onChangeText={t=>setID(t)}></TextInput>
        
        <TouchableOpacity onPress={signin}>
            <Text style={styles.viewbutton}>Sign In</Text>
        </TouchableOpacity>
        <Text>{"\n\n"}</Text>
        <View>
            <Text style={styles.textbox}>Your ID is: {id}</Text>
        </View>
    </View>);

}

const styles = StyleSheet.create({
    container: {
      flex: .3,
      backgroundColor: 'rgba(206, 176, 7, 1)',
      justifyContent: 'center',
      paddingRight: 20,    
      paddingLeft: 20,
    },
    viewbutton: {
        backgroundColor: 'rgba(182, 134, 2, 1)',
        textAlign: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center'

    },
    textbox: {
        backgroundColor: 'white'
    }
  });
  