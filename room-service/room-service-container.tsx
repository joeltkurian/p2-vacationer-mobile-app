import React from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";

export default function RoomServiceComponent(){

    const scrWidth = Dimensions.get('window').width;

    return(
        <View style={styles.container}>
            <CreateOrderComponent/>
            {/* <CartComponent/>
            <CompletedOrders/> */}
            <View style={{height:40, width:scrWidth, flexDirection:"row", alignSelf:"flex-end", alignItems:"center", justifyContent:"center"}}>
                <View style={{flexDirection:"row", width:"100%", alignItems:"center", alignContent:"center", justifyContent:"space-evenly", alignSelf:"center"}}>
                <Button onPress={() =>{}} title="Create an Order"></Button>
                <Button onPress={() =>{}} title="Cart"></Button>
                <Button onPress={() =>{}} title="My Orders"></Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection:"column",
        backgroundColor: '#fff',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop:20,
        height:"100%"
      },
});