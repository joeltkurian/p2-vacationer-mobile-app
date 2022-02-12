import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Text, Pressable } from "react-native";
import { pages, Reservation } from "../dtos";
import { borderColor, loginBtn, loginBtnActive, textColor } from "../styling";
import { initialReservation, userContext } from "../userContext";


export default function NavigationPanel(props: { setNav: Function, Nav: boolean, setPage: Function, account: Reservation }) {
    const translation = useRef(new Animated.Value(-200)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const account = useContext(userContext);
    const setAccount = account.setUser;
    function openNav() {
        props.setNav(props.Nav ? false : true);
    }

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(fade, {
                toValue: 0.6,
                duration: 500,
                useNativeDriver: true
            }),

        ]).start();
    }, [])

    return (<>
        <Animated.View style={[styles.NAVNegContainer, { opacity: fade }]}>
            <Pressable style={styles.NAVNeg} onPress={openNav}></Pressable>
        </Animated.View>

        <Animated.View style={[styles.NAV, { transform: [{ translateX: translation }] }]}>
            <View style={styles.space} />
            <View style={pageStyle.border} />
            <View style={pageStyle.border} />

            {/* ------------------------------------------- INSERT PAGES BELOW BASED ON MANAGER ACCOUNT OR NOT ------------------------------------------------------------------------------- */}

            <ChoosePage name={pages.Reservation} setPage={props.setPage} setNav={props.setNav} />
            <ChoosePage name={pages.Activities} setPage={props.setPage} setNav={props.setNav} />
            <ChoosePage name={pages.Service} setPage={props.setPage} setNav={props.setNav} />
            <ChoosePage name={pages.Complaints} setPage={props.setPage} setNav={props.setNav} />


            {/* -------------------------------------------------------------------------------------------------------------------------- */}


            <View style={pageStyle.border} />

            <View style={styles.logOutPanel}>
                <Pressable onPress={async () => {
                    await AsyncStorage.setItem("user", JSON.stringify(initialReservation));
                    setAccount(initialReservation);
                }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? loginBtnActive
                                : loginBtn
                        },
                        styles.LogoutBTN
                    ]}>
                    <Text style={styles.logoutBtnText}>Log Out</Text>
                </Pressable>
            </View>

        </Animated.View>
    </>)
}

const styles = StyleSheet.create({
    NAVNegContainer: {
        backgroundColor: '#000',
        position: 'absolute',
        right: 0,
        height: '100%',
        width: '100%',
    },
    NAVNeg: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    NAV: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'rgba(255, 240, 200, 0.85)',
        borderWidth: 1,
        borderColor: borderColor,
        height: '100%',
        width: '45%',
        top: '3%',
        alignItems: 'center',
    },
    space: {
        padding: 30,
    },
    logOutPanel: {
        width: '90%',
        position: 'absolute',
        bottom: '5%',
    },
    LogoutBTN: {
        borderRadius: 8,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    logoutBtnText: {
        color: textColor,
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export function ChoosePage(prop: { name: string, setPage: Function, setNav: Function }) {
    function setPage() {
        prop.setPage(prop.name);
        prop.setNav(false);
    }

    return (<>
        <Pressable onPress={setPage} style={({ pressed }) => [
            {
                backgroundColor: pressed
                    ? 'rgba(0,0,0,0.6)'
                    : 'rgba(0,0,0,0)'
            },
            pageStyle.viewStyle
        ]}>
            <Text style={pageStyle.pageText}>
                {prop.name}
            </Text>
        </Pressable>
        <View style={pageStyle.border} />
    </>)
};
const pageStyle = StyleSheet.create({
    viewStyle: {
        width: `100%`,
        paddingVertical: 15,
        borderColor: '#000',
    },
    pageText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    border: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: '#000',
    }
});