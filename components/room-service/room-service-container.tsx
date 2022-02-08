import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Offering } from "../../dtos";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";
import { scrHeight, scrWidth } from "./dimenstions";

export default function RoomServiceComponent() {

    const baseUrl = "http://52.224.91.41:3000/";

    const [visibleComponent, setVisibleComponent] = useState(0);

    const [cart, setCart] = useState<Offering[]>([]);


    function setComponent(num: number) {
        setVisibleComponent(num);
    }

    return (<>
        <View style={styles.container}>
            {visibleComponent < 1 ? <CreateOrderComponent off={cart} setOff={setCart} />
                : visibleComponent === 1 ? <CartComponent off={cart} setOff={setCart} />
                    : <CompletedOrders />}
        </View>
        <View style={{ width: scrWidth, flexDirection: "row", alignSelf: "flex-end", height: 60, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
            <Button onPress={() => { setComponent(0) }} title="Create an Order"></Button>
            <Button onPress={() => { setComponent(1) }} title="Cart"></Button>
            <Button onPress={() => { setComponent(2) }} title="My Orders"></Button>
        </View>
    </>
    )
}




const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: "100%",
        maxHeight: scrHeight - 50,
        width: scrWidth
    },
});