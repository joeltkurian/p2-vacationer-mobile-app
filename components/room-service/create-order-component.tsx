import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, Dimensions, Platform, ToastAndroid, StyleSheet, Pressable } from "react-native";
import { Offering, returnNewService } from '../../dtos';
import { borderColor, loginBtn, loginBtnActive, mainBackgroundColor, textColor } from "../../styling";

export default function CreateOrderComponent(props: { off: Offering[], setOff: Function }) {

    const [menu, setMenu] = useState<Offering[]>([]);

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;

    const cart: Offering[] = props.off;
    const updateCart: Function = props.setOff;

    useEffect(() => {
        (async () => {
            const response = await fetch('http://20.121.74.219:3000/offerings');
            const menu: Offering[] = await response.json();
            if (menu.length === 5)
                setMenu(menu);
            else
                alert("Could not Load the Menu from Server!")
        })()
    }, [])


    function offeringItem(props: { off: Offering }) {
        const { desc, cost } = props.off;
        const service = returnNewService(desc);

        return (<View style={styles.card}>
            <View style={styles.titleView}>
                <Text style={styles.title}>{service.desc}</Text>
                <View style={styles.border} />
            </View>
            <View style={styles.cardStuff}>
                <Image style={styles.image} source={{ uri: service.link }} />
                <View style={styles.container}>
                    <Text style={styles.BtnText}>{"Cost: $" + cost.toFixed(2)}</Text>
                </View>
                <View style={styles.orderBtnView}>
                    <Pressable onPress={() => { cart.push(props.off); updateCart(cart); Platform.OS === 'android' ? ToastAndroid.show("Item Added to Cart", ToastAndroid.SHORT) : alert("Item Added to Cart") }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? loginBtnActive
                                    : loginBtn
                            },
                            styles.BTN]}>
                        <Text style={styles.BtnText}>ORDER</Text></Pressable></View>

            </View>
        </View>
        )
    }

    return (
        <View style={styles.total}>
            <FlatList data={menu} renderItem={({ item }) => offeringItem({ off: item })} keyExtractor={item => item.desc} />
        </View>
    )
}

const styles = StyleSheet.create({
    total: {
        width: '100%',
        alignContent: "center",
        justifyContent: "center",
        paddingTop: '10%',
    },
    titleView: {
        flexDirection: 'column',
        overflow: 'hidden',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    border: {
        borderWidth: 1,
        width: '100%',
        borderColor: '#000',
    },
    card: {
        backgroundColor: mainBackgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    cardStuff: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        marginTop: 5,
        width: 125,
        height: 125,
        marginLeft: 0,
        marginRight: 5,
    },
    container: {
        justifyContent: 'center',
    },
    orderBtnView: {
        justifyContent: 'flex-end',
    },
    BTN: {
        marginBottom: 0,
        margin: 5,
        borderRadius: 8,
        padding: 8,
    },
    BtnText: {
        textAlign: 'center',
        color: textColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
})