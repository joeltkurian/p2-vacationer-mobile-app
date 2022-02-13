import { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
import { activityLocationBasedImages } from "../dtos";
import { borderColor, mainBackgroundColor } from "../styling";


export default function ActivityView() {
    const [activities, setActivities] = useState([
        { id: "1", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "Balcony", status: "On Schedule" }
    ])

    async function getActivites() {
        const response = await fetch('http://20.121.74.219:3000/activities')
        const fetchedActivities = await response.json();

        setActivities(fetchedActivities);

    }

    useEffect(() => {
        getActivites();
    }, [])

    return (<View style={styles.container}>
        <View style={styles.flatlist}>
            <FlatList
                data={activities}
                renderItem={({ item }) => (
                    <View style={item.status === "On Schedule" ? styles.item : styles.itemCancelled}>

                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.border} />
                        <View style={{ flexDirection: 'row' }}>
                            {/* Image View */}
                            <View >
                                <ImageBackground source={{ uri: activityLocationBasedImages[activityLocationBasedImages.findIndex(c => c.location === item.location)]?.photoLink }} style={styles.activityPhoto} />
                                <Text style={styles.location}>{item.location}</Text>
                            </View>
                            {/* Description View */}
                            <View style={styles.textStuff}>
                                <Text style={styles.desc}>{item.desc}</Text>
                                <View style={styles.border} />
                                <Text style={[styles.desc, { marginLeft: 10, fontWeight: 'bold', fontSize: 14, color: "#000" }]}>STATUS: {item.status}</Text>
                                <Text>{"\n"}</Text>
                                <Text style={styles.times}>Starts: {item.startTime} - Ends: {item.endTime}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
        <View>

        </View>
    </View>);

}

const styles = StyleSheet.create({
    container: {
        marginTop: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '98%',
        width: '100%'
    },
    flatlist: {
        justifyContent: 'center',
        padding: 6,
        height: '85%',
        width: '95%'
    },
    border: {
        borderWidth: 1,
        width: '100%',
        borderColor: '#000',
        marginBottom: 2,
    },
    item: {
        backgroundColor: mainBackgroundColor,
        borderWidth: 2,
        borderColor: borderColor,
        padding: 8,
        marginVertical: 8,
        borderRadius: 10,
        marginHorizontal: 16,
    },
    itemCancelled: {
        backgroundColor: 'rgba(150, 150, 150, 0.6)',
        opacity: 0.6,
        borderWidth: 2,
        borderColor: 'rgba(150, 150, 150, 0.8)',
        padding: 8,
        marginVertical: 8,
        borderRadius: 10,
        marginHorizontal: 16,
    },
    textStuff: {
        width: '60%',
        flexDirection: 'column',
    },
    title: {
        fontSize: 28,
        textAlign: 'center'
    },
    desc: {
        fontSize: 14,
        textAlign: 'center'
    },
    location: {
        fontSize: 14,
        textAlign: 'center',
        position: 'absolute',
        margin: 2,
        backgroundColor: mainBackgroundColor,
    },
    times: {
        fontSize: 13,
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20
    },
    activityPhoto: {
        height: 120,
        width: 120,
    }
});