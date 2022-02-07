import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";
import { scrHeight, scrWidth } from "./dimenstions";

export default function RoomServiceComponent(){

    const baseUrl = "http://52.224.91.41:3000/";

    const [visibleComponent,setVisibleComponent] = useState(0);


    function setComponent(num:number){
        setVisibleComponent(num);
    }

    return(
        <View style={styles.container}>
            {visibleComponent < 1 ? <CreateOrderComponent/> 
            :visibleComponent === 1 ? <CartComponent off={[]} setOff={() => {}}/> 
            :<CompletedOrders/>}
            <View style={{width:scrWidth, flexDirection:"row", alignSelf:"flex-end", alignItems:"center", justifyContent:"center"}}>
                <View style={{flexDirection:"row", width:"100%", justifyContent:"space-evenly", height:37}}>
                <Button onPress={() =>{setComponent(0)}} title="Create an Order"></Button>
                <Button onPress={() =>{setComponent(1)}} title="Cart"></Button>
                <Button onPress={() =>{setComponent(2)}} title="My Orders"></Button>
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
        paddingTop:70,
        height:scrHeight,
        width:scrWidth
      },
});