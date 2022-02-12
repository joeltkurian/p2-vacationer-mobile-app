import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, Pressable, View } from "react-native";
import { borderColor, loginBtn, loginBtnActive, mainBackgroundColor, textColor } from "../styling";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ComplaintView() {

    //complaint to be added
    const [desc, setDesc] = useState('');
    const [photoUri, setPhotoUri] = useState('');
    function submit() {
        if (desc != "") {
            alert(desc);
        } else {
            alert('please add a description');
        }
    }

    async function addPhoto() {
        const result = await launchCamera({ mediaType: 'photo', includeBase64: true });
        //console.log(result);
    }

    return (<View style={styles.total}>
        <View style={styles.container}>
            <Text style={styles.title}>Create A New Complaint</Text>
            <View style={styles.border} />
            <View >
                <Text style={styles.desc}>Description</Text>
                <TextInput style={styles.input} multiline={true} onChangeText={t => setDesc(t)} />
            </View>
            {/* put more space here */}
            <View style={styles.buttonView}>
                {/* form buttons */}
                <Pressable onPress={addPhoto}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? loginBtnActive
                                : loginBtn
                        },
                        [styles.Btn, { marginRight: 50 }]
                    ]}><Text style={styles.BtnTxt}>Add Photo</Text>
                </Pressable>
                <Pressable onPress={submit}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? loginBtnActive
                                : loginBtn
                        },
                        [styles.Btn, { marginRight: 50 }]
                    ]}><Text style={styles.BtnTxt}>  Submit </Text>
                </Pressable>
            </View>
        </View>
    </View>);

}

const styles = StyleSheet.create({
    total: {
        width: '90%',
        height: '90%',
        marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        borderWidth: 1,
        width: '100%',
        borderColor: '#000',
        marginBottom: 2,
    },
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: mainBackgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 20,
        paddingLeft: 20,
    },
    timeText: {
        fontSize: 12,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'grey',
    },
    buttonView: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
    input: {
        backgroundColor: 'rgba(252, 255, 255, 0.5)',
        minHeight: '15%',
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.4)",
        borderRadius: 8,
    }
});