import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInView(props: { user: { id: String, isAuthenticated: Boolean }, updateUser: Function }) {
    
    const [id, setID] = useState("")

    async function signin() {
        //make an actual login request

        const response = await fetch("https://a130d8c2-b00f-4b4d-9a87-8d1d9f9ba331.mock.pstmn.io/reservations/"+id)
        const user = await response.json();

        //setUser instead of setID
        let isAuth = false;

        try{
        if (id === user.id)
             isAuth = true 
        else if (id === null)
            Alert.alert(`User ${id} does not exist.`)
        } catch(error) {
            console.error('Reservation not found')
        }

        props.updateUser({ id: id, isAuthenticated: isAuth })
    }

    return (<View style={styles.container}>
        <Text style={styles.header}>Sign in with your ID:{"\n\n"}</Text>
        <TextInput style={{ backgroundColor: '#eeffee' }} onChangeText={t => setID(t)}></TextInput>

        <TouchableOpacity onPress={signin}>
            <Text style={styles.viewbutton}>Sign In</Text>
        </TouchableOpacity>
        
    </View>);

}

const styles = StyleSheet.create({
    container: {
        flex: .3,
        backgroundColor: 'rgba(206, 176, 7, .7)',
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft: 20,
    },
    viewbutton: {
        backgroundColor: 'rgba(182, 134, 2, .9)',
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
