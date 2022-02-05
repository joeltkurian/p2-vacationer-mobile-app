import { useState } from "react";
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ComplaintView(){
    const [complaints, setActivities] = useState([
        {id: "1", submittedTime: 0, desc: "My gun didnt shoot and I ended up dying, now the series can't continue", status: "Unreviewed", photoLink: ""},
        {id: "2", submittedTime: 8, desc: "TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEXT", status: "Unreviewed"},
        {id: "3", submittedTime: 12, desc: "desc", status: "Unreviewed", photoLink: ""},
        {id: "4", submittedTime: 17, desc: "movie quote", status: "Unreviewed", photoLink: undefined},
        {id: "5", submittedTime: 5, desc: "pop culture reference", status: "Unreviewed", photoLink: undefined},        
        
    ])      
    
    function getComplaints(){
    
    }

    function addComplaint(){

    }

    return(<View>

        <View style={styles.container}>
            <FlatList 
                data={complaints}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
                        
                        <Text style={styles.title}>{item.status}</Text>
                        
                        <View style={{flexDirection: 'row'}}>
                            {/* Image View ONLY if it has one*/}
                            {!!item.photoLink?.toString ?
                            <View style={{backgroundColor:'#ffcab1'}}>
                                <View style={{height: 100, width: 100, backgroundColor: 'red'}}></View>
                            </View> : <></>
                            }
                            {/* Description View */}
                            <View>
                                <Text style={styles.desc}>DESCRIPTION: {item.desc}</Text>
                                <Text style={styles.timeText}>Time Sumbitted: {item.submittedTime}</Text>
                                <Text>{"\n"}</Text>
                                <Text style={styles.timeText}>Dev only! ID: {item.id}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

        <View style={styles.buttonStyle}>

            {/* make a modal for each */}

            {/* this one's an input form */}
            <Button onPress={addComplaint} title={"New Complaint"}/>    
            {/* this one just displays text, receipt-style */}
            <Button onPress={addComplaint} title={"Past Complaints"}/>    
        </View>
    </View>);

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eeffee',
      justifyContent: 'center',
      paddingRight: 20,    
      paddingLeft: 20,
    },
    item: {
        flex: 1,
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 200
        
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
        color: 'grey',
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        marginTop: 5,
        backgroundColor: '#aabbaa'
    }
});