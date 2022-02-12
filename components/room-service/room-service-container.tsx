import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Offering, Reservation } from "../../dtos";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";
import { userContext } from "../../userContext";
import { borderColor, loginBtn, loginBtnActive, mainBackgroundColor, textColor } from "../../styling";
export default function RoomServiceComponent() {

    //communicate with the back end for all components
    const context = useContext(userContext);
    const [visibleComponent, setVisibleComponent] = useState(0);

    const [cart, setCart] = useState<Offering[]>([]);

    const [reservation, setReservation] = useState<Reservation>({ id: "", checkIn: 0, checkOut: 0, owner: "", room: "" });

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://a130d8c2-b00f-4b4d-9a87-8d1d9f9ba331.mock.pstmn.io/reservations/${context.user.id}`);
            const user: Reservation = await response.json();
            if (user.id) {
                setReservation(user);
            }
        })();
    }, [context])

    function setComponent(num: number) {
        setVisibleComponent(num);
    }

    return (<>
        <View style={styles.total}>
            <View style={styles.container}>
                {visibleComponent < 1 ? <CreateOrderComponent off={cart} setOff={setCart} />
                    : visibleComponent === 1 ? <CartComponent off={cart} setOff={setCart} reservation={reservation} />
                        : <CompletedOrders reservation={reservation} />}
            </View>
        </View>
        <View style={styles.orderBtns}>
            <Pressable onPress={() => { setComponent(0) }} style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? loginBtnActive
                        : loginBtn
                },
                styles.BTN]}>
                <Text style={styles.BtnText}>Create Order</Text></Pressable>
            <Pressable onPress={() => { setComponent(1) }} style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? loginBtnActive
                        : loginBtn
                },
                styles.BTN]}>
                <Text style={styles.BtnText}>Cart</Text></Pressable>
            <Pressable onPress={() => { setComponent(2) }} style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? loginBtnActive
                        : loginBtn
                },
                styles.BTN]}>
                <Text style={styles.BtnText}>Order History</Text></Pressable>
        </View>
    </>)
}

const styles = StyleSheet.create({
    total: {
        marginTop: '5%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: "90%",
        width: "90%",
        marginBottom: '2%',
    },
    orderBtns: {
        position: 'absolute',
        bottom: 0,
        borderWidth: 2,
        borderColor: borderColor,
        backgroundColor: mainBackgroundColor,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    BTN: {
        margin: 5,
        borderRadius: 8,
        padding: 4,
    },
    BtnText: {
        textAlign: 'center',
        color: textColor,
        fontWeight: 'bold',
        fontSize: 20,
    }
});