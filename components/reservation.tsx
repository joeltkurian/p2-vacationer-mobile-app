import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Reservation } from "../dtos";
import { borderColor, mainBackgroundColor } from "../styling";
import { userContext } from "../userContext";


export default function ReservationDetails() {
    const context = useContext(userContext);
    const reservation: Reservation = context.user;
    return (<View style={styles.total}>
        <View style={styles.card}>
            <View style={styles.innerCard}>
                <Text style={styles.roomTxt}>{reservation.room}</Text>
                <View style={styles.checkView}>
                    <View style={{ flexDirection: 'column', padding: 5, alignItems: 'center' }}>
                        <Text style={[styles.checkTxt, { fontWeight: 'bold' }]}>Check-In</Text><Text style={styles.checkTxt}>{reservation.checkIn}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', padding: 5, alignItems: 'center' }}>
                        <Text style={[styles.checkTxt, { fontWeight: 'bold' }]}>Check-Out</Text><Text style={styles.checkTxt}>{reservation.checkOut}</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    total: {
        width: '100%',
        height: '90%',
        marginTop: '18%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        backgroundColor: mainBackgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: 10,
    },
    innerCard: {
        paddingVertical: 15,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    roomTxt: {
        backgroundColor: mainBackgroundColor,
        padding: 10,
        fontSize: 35,
        borderWidth: 2,
        fontWeight: 'bold',
        borderColor: '#0004',
        borderRadius: 15,
    },
    checkTxt: {
        fontSize: 20,
    },
    checkView: {
        marginTop: 15,
        flexDirection: 'row',
        width: '90%',
        backgroundColor: mainBackgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        justifyContent: 'space-between',
    }
})