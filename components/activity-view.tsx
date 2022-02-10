import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ActivityView() {
    const [activities, setActivities] = useState([
        { id: "1", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" },
        { id: "2", title: "Death Ray Competition", desc: "Test your photon beams against live targets in this last-one-standing colloseum-type deathmatch. Perfect for the kids.", startTime: "RIGHT NOW", endTime: "NEVER", location: "Colloseum", status: "On Schedule" },
        { id: "3", title: "Lazy Blood River", desc: "Let your superhero worries melt away as the literal blood of our enemies rejuvinates your skin and replenishes your iron content.", startTime: "RIGHT NOW", endTime: "NEVER", location: "Colloseum", status: "On Schedule" },
        { id: "4", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" },
        { id: "5", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" },
        { id: "6", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" },
        { id: "7", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" },
        { id: "8", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" },
        { id: "9", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" },
        { id: "10", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "HERE", status: "On Schedule" }
    ])

    function getActivites() {
        //make an actual login request
        //setUser instead of setID

    }

    return (<View style={styles.container}>
        <View style={styles.flatlist}>
            <FlatList
                data={activities}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>

                        <Text style={styles.title}>{item.title}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            {/* Image View */}
                            <View style={{ backgroundColor: '#ffcab1', height:120}}>
                                <View style={{ height: 100, width: 100, backgroundColor: 'red' }}></View>
                                <Text style={styles.location}>{item.location}</Text>
                            </View>
                            {/* Description View */}
                            <View>
                                <Text style={styles.desc}>DESCRIPTION: {item.desc} STATUS: {item.status}</Text>
                                <Text>{"\n"}</Text>
                                <Text style={styles.times}>Starts: {item.startTime} Ends: {item.endTime}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
        <View>

        </View>
    </View>);

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(206, 176, 7, .7)',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    flatlist: {
        justifyContent: 'center',
        padding: 6,
        height: '85%',
        width: '95%'
    },
    text: {
        color: 'rgba(100,0,40,1)'
    },
    item: {
        flex: 1,
        backgroundColor: 'rgba(247, 238, 123, .8)',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 220

    },
    title: {
        fontSize: 28,
        textAlign: 'center'
    },
    desc: {
        fontSize: 12,
        paddingLeft: 20,
        paddingRight: 85
    },
    location: {
        fontSize: 12,
        textAlign: 'center',
    },
    times: {
        fontSize: 12,
        color: 'grey',
        paddingLeft: 20,
        paddingRight: 20
    }
});