import React, { useContext, useState } from "react";
import { View, ImageBackground, StyleSheet, Text, Pressable } from "react-native"
import { pages } from "../dtos";
import { borderColor, gold, hamburger, loginBtn, loginBtnActive, mainBackgroundColor, styleBackground } from "../styling";
import { userContext } from "../userContext";
import ActivityView from "./activity-view";
import ComplaintView from "./complaint-view";
import NavigationPanel from "./navigation-page";
import ReservationDetails from "./reservation";
import RoomServiceComponent from "./room-service/room-service-container";

export default function HomePage() {
    const account = useContext(userContext);
    const user = account.user;
    const [Nav, setNav] = useState(false);
    const [currentPage, setCurrentPage] = useState(pages.Reservation);
    function openNav() {
        setNav(Nav ? false : true);
    }
    return (<ImageBackground source={gold} style={styleBackground.image}>
        <View style={styles.border}>
            {currentPage === pages.Reservation ?
                <View style={styles.welcome}><Text style={styles.welcomeText}>Welcome {account.user.owner}</Text></View> :
                currentPage === pages.Activities ?
                    <View style={styles.welcome}><Text style={styles.welcomeText}>ACTIVITIES</Text></View> :
                    currentPage === pages.Service ?
                        <><View style={styles.welcome}><Text style={styles.welcomeText}>ROOM SERVICE</Text></View>
                            <View style={styles.roomNumView}><Text style={styles.roomNum}>Room:{account.user.room}</Text></View></> :
                        currentPage === pages.Complaints ?
                            <View style={styles.welcome}><Text style={styles.welcomeText}>REPORT A PROBLEM</Text></View> :
                            <Text>Something Went Wrong</Text>
            }

            <View style={styles.pages}>
                {currentPage === pages.Reservation ?
                    <ReservationDetails /> :
                    currentPage === pages.Activities ?
                        <ActivityView /> :
                        currentPage === pages.Service ?
                            <RoomServiceComponent /> :
                            currentPage === pages.Complaints ?
                                <ComplaintView /> :
                                <Text>Something Went Wrong</Text>
                }
            </View>
            {Nav ?
                <NavigationPanel setNav={setNav} Nav={Nav} setPage={setCurrentPage} account={user} />
                :
                <Pressable onPress={openNav}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? loginBtnActive
                                : loginBtn
                        },
                        styles.NavBTN
                    ]}>
                    <ImageBackground source={hamburger} style={styles.ham} />
                </Pressable >
            }
        </View>
    </ImageBackground >);
}

const styles = StyleSheet.create({
    border: {
        height: '98%',
        width: '100%',
    },
    pages: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    ham: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    NAV: {
        position: 'absolute',
        left: 0,
        backgroundColor: mainBackgroundColor,
        height: '100%',
        width: '40%',
        top: '3%',
    },
    NAVNeg: {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: '60%',
    },
    NavBTN: {
        borderRadius: 8,
        height: "6%",
        elevation: 5,
        position: 'absolute',
        top: '4%',
        left: '3%',
        width: '15%',
    },
    welcome: {
        backgroundColor: mainBackgroundColor,
        position: 'absolute',
        top: `4%`,
        right: `0%`,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: borderColor,
        width: '80%'
    },
    roomNumView: {
        position: 'absolute',
        right: "1%",
        marginTop: "19%",
    },
    roomNum: {
        backgroundColor: mainBackgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 1,
        fontSize: 18,
        color: '#000',
    },
    welcomeNoClock: {
        width: '100%',
    },
    welcomeClock: {
        width: '78%',
    },
    welcomeText: {
        fontSize: 25,
        padding: 5,
    }
});