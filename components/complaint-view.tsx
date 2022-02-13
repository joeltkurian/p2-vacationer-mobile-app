import { useState } from "react";
import { StyleSheet, Text, TextInput, Pressable, View, ImageBackground } from "react-native";
import { borderColor, loginBtn, loginBtnActive, mainBackgroundColor, textColor } from "../styling";
import * as ImagePicker from 'expo-image-picker';

export default function ComplaintView() {

    //complaint to be added
    const [desc, setDesc] = useState('');
    const [photoUri, setPhotoUri] = useState('');
    const [addPhotoClicked, setAddPhotoClicked] = useState(false);
    async function submit() {
        if (desc !== "") {
            const prob: { desc: string, file: string } = { desc: desc, file: photoUri };
            const response = await fetch('https://problemapi.azurewebsites.net/api/ProblemIngestion',
                {
                    method: "POST",
                    body: JSON.stringify(prob),
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
            if (response.status === 200) {
                alert('Problem was successfully added');
            } else
                alert('Problem could not be processed');
        } else {
            alert('please add a description');
        }
    }

    async function addPhoto(cam: boolean) {
        let result;
        if (cam) {
            result = await ImagePicker.launchCameraAsync({ base64: true, mediaTypes: ImagePicker.MediaTypeOptions.Images });
        }
        else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                quality: 1,
            });
        }
        // console.log(result);
        setAddPhotoClicked(false);
        if (!result.cancelled) {
            const base: string = 'data:image/png;base64,'
            const r = base + result.base64;
            setPhotoUri(r);
        } else {
            setPhotoUri('');
        }
    }


    return (<View style={styles.total}>
        {addPhotoClicked ?
            <View style={[{ justifyContent: 'space-evenly', alignItems: 'center' }, styles.container, { flexDirection: 'row' }]}>
                {/* form buttons */}
                <Pressable onPress={() => addPhoto(true)}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? loginBtnActive
                                : loginBtn
                        },
                        [styles.Btn, { width: '40%' }]
                    ]}><Text style={styles.BtnTxt}>Camera</Text>
                </Pressable>
                <Pressable onPress={() => addPhoto(false)}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? loginBtnActive
                                : loginBtn
                        },
                        [styles.Btn, { width: '35%' }]
                    ]}><Text style={styles.BtnTxt}>File</Text>
                </Pressable>
            </View>
            :
            <View style={styles.container}>
                <Text style={styles.title}>Create A New Complaint</Text>
                <View style={styles.border} />
                <View >
                    <Text style={styles.desc}>Description</Text>
                    <TextInput style={styles.input} multiline={true} onChangeText={t => setDesc(t)} />
                </View>
                <View style={styles.buttonView}>
                    <Pressable onPress={() => { setAddPhotoClicked(true) }}
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
                {photoUri !== '' ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><ImageBackground source={{ uri: photoUri }} style={styles.problemPhoto} /></View> : <></>}
            </View>
        }
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
    problemPhoto: {
        justifyContent: 'center',
        width: 150,
        height: 150,
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