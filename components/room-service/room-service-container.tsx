import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Offering, Reservation } from "../../dtos";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";
import { scrHeight, scrWidth } from "./dimenstions";

export default function RoomServiceComponent(props:{userId:string}) {

    //communicate with the back end for all components

    const [visibleComponent, setVisibleComponent] = useState(0);

    const [cart, setCart] = useState<Offering[]>([]);

    const [reservation,setReservation] = useState<Reservation>({id: "",checkIn: 0,checkOut: 0,owner: "",room: ""});

    useEffect(()=>{
        (async () =>{
            const response = await fetch(`https://a130d8c2-b00f-4b4d-9a87-8d1d9f9ba331.mock.pstmn.io/reservations/${props.userId}`);
            const user:Reservation = await response.json();
            if(user.id){
                setReservation(user);
            }
        })();
    },[])



    function setComponent(num: number) {
        setVisibleComponent(num);
    }

    return (<>
        <View style={styles.container}>
            {visibleComponent < 1 ? <CreateOrderComponent off={cart} setOff={setCart} />
                : visibleComponent === 1 ? <CartComponent off={cart} setOff={setCart} reservation={reservation}/>
                    : <CompletedOrders reservation={reservation}/>}
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