import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";

export default function RoomServiceComponent(){

    const baseUrl = "http://52.224.91.41:3000/";

    const [createVisible,setCreateVisible] = useState(false);
    const [cartVisible,setCartVisible] = useState(false);
    const [ordersVisible,setOrdersVisible] = useState(true);

    return(
        <View style={styles.container}>
            {createVisible ? <CreateOrderComponent/> : <View/>}
            {cartVisible ? <CartComponent/> : <View/>}
            {ordersVisible ? <CompletedOrders/> : <View/>}
            <View style={{width:scrWidth, flexDirection:"row", alignSelf:"flex-end", alignItems:"center", justifyContent:"center"}}>
                <View style={{flexDirection:"row", width:"100%", justifyContent:"space-evenly"}}>
                <Button onPress={() =>{}} title="Create an Order"></Button>
                <Button onPress={() =>{}} title="Cart"></Button>
                <Button onPress={() =>{}} title="My Orders"></Button>
                </View>
            </View>
        </View>
    )
}

    export const scrWidth = Dimensions.get('window').width;
    export const scrHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection:"column",
        backgroundColor: '#fff',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop:70,
        height:scrHeight,
        width:scrWidth
      },
});