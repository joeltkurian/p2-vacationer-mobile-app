import { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { activityLocationBasedImages } from "../dtos";


export default function ActivityView() {
    const [activities, setActivities] = useState([
        { id: "1", title: "NAME", desc: "DESCRIPTION", startTime: 0, endTime: 1, location: "Balcony", status: "On Schedule" }
    ])

    async function getActivites() {
        const response = await fetch('http://20.121.74.219:3000/activities')
        const fetchedActivities = await response.json();

        setActivities(fetchedActivities);

    }

    useEffect(()=>{
        getActivites();
    }, [])

    return (<View style={styles.container}>
        <View style={styles.flatlist}>
            <FlatList
                data={activities}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>

                        <Text style={styles.title}>{item.title}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            {/* Image View */}
                            <View style={{ backgroundColor: 'rgba(206, 176, 7, .7)', height:120}}>

                                <ImageBackground source={{ uri: activityLocationBasedImages[activityLocationBasedImages.findIndex(c => c.location === item.location)]?.photoLink }} style={styles.activityPhoto}>
                                    
                                </ImageBackground>
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
    },
    activityPhoto: { 
        height: 100, 
        width: 100, 
        backgroundColor: 'red' }
});