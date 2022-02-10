import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ComplaintView() {

    // swaps between complaints view vs create complaint form
    // true = view | false = form

    const [focus, setFocus] = useState(true)

    //complaint to be added
    const [complaint, setComplaint] = useState({
        id: "",
        submittedTime: 0,
        desc: "",
        status: "Unreviewed",
        photoLink: undefined
    })

    function addComplaint() {
        if (complaint.desc != "") {
            //look up how to set this up vvv
            //Platform.OS === 'android'? ToastAndroid.show("Item Added to Cart", ToastAndroid.SHORT) :alert("Item Added to Cart")

            Alert.alert("Complaint " + complaint.desc + " added!")
        }
    }

    function addPhoto() {
        console.log("wow nice photo")
    }

    return (<View style={styles.container}>
            <View style={styles.form}>
                <Text style={{ fontSize: 24, marginHorizontal: 16 }}>Create A New Complaint: </Text>
                <Text style={{ marginHorizontal: 16 }}>Description:</Text>
                <TextInput style={styles.input} multiline={true} onChangeText={t => setComplaint({
                    //random number for ID, not necessary
                    id: String(Math.random() * 999),
                    submittedTime: new Date().getTime(),
                    desc: t,
                    status: "Unreviewed",
                    photoLink: undefined
                })} />
                {/* put more space here */}
                <View style={styles.buttonView}>
                    {/* form buttons */}
                    <TouchableOpacity style={styles.button} onPress={addPhoto}>
                        <Text>Add Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={addComplaint}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </View>);

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(206, 176, 7, .7)',
        justifyContent: 'center',
    },
    containerFlatList: {
        width: '95%',
        height: '80%',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        backgroundColor: 'rgba(247, 238, 123, .8)',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 250
    },
    title: {
        fontSize: 28,
        textAlign: 'center'
    },
    desc: {
        fontSize: 12,
        paddingLeft: 20,
        paddingRight: 100
    },
    timeText: {
        fontSize: 12,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'grey',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        height: 50,
        bottom: 0,
        width: '100%',
        marginTop: 5,
        backgroundColor: 'rgba(247, 238, 123, .5)'
    },
    button: {
        alignItems: 'center',
        width: 150,
        backgroundColor: 'rgba(182, 134, 2, 1)'
    },
    form: {
        flex: .3,
        backgroundColor: 'rgba(247, 238, 123, 1)'
    },
    input: {
        width: 400,
        height: 80,
        backgroundColor: 'rgba(252, 255, 233, 1)',
    }
});