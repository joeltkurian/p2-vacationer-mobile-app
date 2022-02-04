import React from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";

export default function RoomServiceComponent(){

    const baseUrl = "http://52.224.91.41:3000/";

    return(
        <View style={styles.container}>
            {/* <CreateOrderComponent/> */}
            <CartComponent/>
            {/* <CompletedOrders/> */}
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

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;


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