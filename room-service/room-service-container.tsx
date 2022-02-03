import { StyleSheet, View } from "react-native";
import CartComponent from "./cart-component";
import CompletedOrders from "./completed-orders";
import CreateOrderComponent from "./create-order-component";

export default function RoomServiceComponent(){


    return(
        <View style={styles.container}>
            <CreateOrderComponent/>
            {/* <CartComponent/>
            <CompletedOrders/> */}
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
        padding:20,
        height:"100%"
      },
});