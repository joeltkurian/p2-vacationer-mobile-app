import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, Image, Button, FlatList, Platform, ToastAndroid, StyleSheet, Pressable } from "react-native";
import { Offering, Offerings, Reservation, returnNewService, ServiceRequest } from "../../dtos";
import { borderColor, loginBtn, loginBtnActive, mainBackgroundColor, textColor } from "../../styling";

export default function CartComponent(props: { off: Offering[], setOff: Function, reservation: Reservation }) {

    const [offerings, setOfferings] = useState<Offerings>({ items: [], quantities: [] });

    const cart: Offering[] = props.off;
    const setCart: Function = props.setOff;

    function convert(off: Offering[]): Offerings {
        let myCart: Offerings = { items: [], quantities: [] };


        for (const i of off) {
            const index = myCart.items.findIndex(c => c.desc === i.desc)
            if (index != -1) {
                myCart.quantities[index] += 1;
            } else {
                myCart.items.push(i);
                myCart.quantities.push(1);
            }
        }
        return myCart;
    }

    useEffect(() => {
        const sortedOffs = props.off.sort((a, b) => a.desc < b.desc ? -1 : a.desc > b.desc ? 1 : 0);
        setOfferings(convert(sortedOffs));
    }, [props.off])

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;

    function total(offs: Offerings) {
        let sum = 0;
        for (let i = 0; i < offs.items.length; i++) {
            sum += offs.items[i].cost * offs.quantities[i];
        }
        return sum;
    }

    function offeringItem(props: { off: Offering, qty: number }) {
        const { desc, cost } = props.off;
        const [title, descr] = desc.split('*');
        const service = returnNewService(desc);
        const scrWidth = Dimensions.get('window').width;

        if (props.qty !== 0) {
            return (
                <View style={styleCard.totalCard}>
                    <Text style={styleCard.title}>{service.desc}</Text>
                    <View style={styleCard.border} />
                    <View style={styleCard.card}>
                        <Image style={styleCard.image} source={{ uri: service.link }} />
                        <View style={styleCard.cardDetails}>
                            <View style={styleCard.cardTxt}>
                                <Text style={styleCard.propsTxt}>{"Total Price: $" + (cost * props.qty).toFixed(2)}</Text>
                                <Text style={styleCard.propsTxt}>Quantity: {props.qty}</Text>
                            </View>
                            <View>
                                <Pressable onPress={() => {
                                    for (let i = 0; i < cart.length; i++) {
                                        if (cart[i] === props.off) {
                                            cart.splice(i, 1);
                                            break;
                                        }
                                    }
                                    setCart(cart);
                                    setOfferings(convert(cart))
                                    Platform.OS === 'android' ? ToastAndroid.show("Item Removed from Cart", ToastAndroid.SHORT) : alert("Item Removed from Cart")
                                }}
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? loginBtnActive
                                                : loginBtn
                                        },
                                        styles.placeOrderBtn]} >
                                    <Text style={styles.placeOrderTxt}>Remove</Text></Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return (<></>);
        }
    }

    const styleCard = StyleSheet.create({
        totalCard: {
            flexDirection: "column",
            width: "100%",
            marginVertical: 5,
            borderWidth: 3,
            padding: 10,
            borderRadius: 10,
            backgroundColor: mainBackgroundColor,
            borderColor: borderColor,
        },
        border: {
            borderWidth: 1,
            width: '100%',
            borderColor: '#000',
        },
        card: {
            flexDirection: "row",
            alignItems: 'center',
        },
        title: {
            marginRight: 10,
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'right',
        },
        image: {
            height: 138,
            width: 138,
            marginVertical: 2,
            marginLeft: 2,
        },
        cardDetails: {
            flexDirection: "column",
            alignItems: "center",

        },
        cardTxt: {
            padding: 20,
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
        },
        propsTxt: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
        },
    });

    async function submit() {
        const payload: ServiceRequest = {
            id: "",
            room: props.reservation.room,
            created: 0,
            status: "Ordered",
            requestedOfferings: cart
        };
        const response = await fetch("http://20.121.74.219:3000/servicerequests", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" }
        });
        if (response.status === 201) {
            Platform.OS === 'android' ? ToastAndroid.show("Order Submitted!", ToastAndroid.SHORT) : alert("Order submitted!")
            setCart([]);
            setOfferings({ items: [], quantities: [] })
        }
        else {
            alert("Something went wrong");
        }
    }

    return (
        <View style={styles.total}>
            {props.off.length === 0 ? <Text style={styles.nothingCartTxt}>Nothing in cart yet!</Text>
                :
                <View style={styles.container}>
                    <View style={styles.flat}>
                        <FlatList data={offerings.items} renderItem={({ item, index }) => offeringItem({ off: item, qty: offerings.quantities[index] })} keyExtractor={(item) => item.desc} />
                    </View>
                    <View style={styles.totalOrderView}>
                        <Text style={styles.totalTxt}>${total(offerings).toFixed(2)}</Text>
                        <Pressable onPress={submit} style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? loginBtnActive
                                    : loginBtn
                            },
                            styles.placeOrderBtn]} >
                            <Text style={styles.placeOrderTxt}>Place Order</Text></Pressable>
                    </View>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    total: {
        height: "95%",
        width: '100%',
        alignItems: "center",
        paddingBottom: "4%",
    },
    nothingCartTxt: {
        marginTop: '50%',
        color: textColor,
        fontWeight: 'bold',
        fontSize: 30,
        borderColor: borderColor,
        backgroundColor: mainBackgroundColor,
        padding: 8,
        borderWidth: 1,
    },
    totalOrderView: {
        borderColor: borderColor,
        backgroundColor: mainBackgroundColor,
        borderWidth: 1,
    },
    totalTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    placeOrderBtn: {
        borderRadius: 8,
        margin: 5,
        padding: 5,
        elevation: 5,
    },
    placeOrderTxt: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    container: {
        width: '100%',
        height: '100%'
    },
    flat: {
        marginBottom: 10,
    }
})