import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, TextInput, Pressable, View, ImageBackground } from "react-native";
import { Reservation } from "../dtos";
import { backgroundContinental, borderColor, loginBtn, loginBtnActive, mainBackgroundColor, textColor } from "../styling";

export default function SignInView(props: { updateUser: Function }) {

    const [id, setID] = useState("")

    async function signin() {
        //make an actual login request
        if (id != '') {
            const response = await fetch("https://a130d8c2-b00f-4b4d-9a87-8d1d9f9ba331.mock.pstmn.io/reservations/" + id);
            const user: Reservation = await response.json();
            if (user) {
                console.log(user);
                await AsyncStorage.setItem("user", JSON.stringify(user));
                props.updateUser(user);
            } else {
                alert(`Reservation id:${id} does not exist, please try again!`);
            }
        }
        else { alert('Please enter a valid reservation ID'); }
    }

    return (<ImageBackground source={backgroundContinental} style={styles.backgroundImage}>
        <View style={styles.container}>
            <Text style={styles.header}>Sign in with your ID</Text>
            <TextInput style={{ backgroundColor: '#eeffee', textAlign: 'center', borderWidth: 1, borderRadius: 10, marginBottom: 5 }} onChangeText={t => setID(t)}></TextInput>

            <Pressable onPress={signin}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? loginBtnActive
                            : loginBtn
                    },
                    styles.Btn
                ]}><Text style={styles.BtnTxt}>Sign In</Text>
            </Pressable>
        </View>
    </ImageBackground>);

}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%', height: '100%',
        justifyContent: 'center', alignItems: 'center', flex: 1,
    },
    container: {
        padding: 30,
        backgroundColor: mainBackgroundColor,
        borderColor: borderColor,
        justifyContent: 'center',
        paddingRight: 20,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
    },
    viewbutton: {
        backgroundColor: 'rgba(182, 134, 2, .9)',
        textAlign: 'center',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 15,
    },
    textbox: {
        textAlign: 'center',
        backgroundColor: 'white'
    },
    Btn: {
        margin: 5,
        borderRadius: 8,
        padding: 6,
    },
    BtnTxt: {
        textAlign: 'center',
        color: textColor,
        fontWeight: 'bold',
        fontSize: 20,
    },
});
