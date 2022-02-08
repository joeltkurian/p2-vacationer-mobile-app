import React from "react";
import { Text, View, Image, Button, FlatList, Dimensions, Platform, ToastAndroid } from "react-native";
import { isPropertyAccessChain } from "typescript";
import { Offering } from '../dtos';
import CartComponent from "./cart-component";

export default function CreateOrderComponent(props:{off:Offering[], setOff:Function}){

    const dummy:Offering[] = [
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
        {desc:"Rice Balls*Lorem Ipsum About Rice Balls", cost:14},
        {desc:"Spaghetti and Meatballs*Lorem Ipsudm About Spaghetti and Meatballs", cost:19.80},
        {desc:"12 oz. Ribeye*Loresm fIpsum About Ribeye Steak", cost:24.75},
    ];

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;
    const cart:Offering[] = props.off;
    const updateCart:Function = props.setOff;

    return(
        <View style={{ width:scrWidth, alignContent:"center", paddingHorizontal:2, justifyContent:"flex-start", paddingTop:30}}>
            <Text style={{alignSelf:"center"}}>Create Order Component</Text>
            <FlatList data={dummy} renderItem={({item}) => offeringItem({off:item})} keyExtractor={item => item.desc}/>
        </View>
    )


function offeringItem(props:{off:Offering}){
    const {desc, cost} = props.off;
    const [title, descr] = desc.split('*');
    const imageLink = 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/question-mark.png';

    const scrWidth = Dimensions.get('window').width;

    return(
        <View style={{flexDirection:"row", width:"100%", height:135}}>
            <View style={{flexDirection:"column", height:128, width:128,}}>
                <Image style={{height:128, width:128}} source={{uri:imageLink}}/>
            </View>
            <View style={{flexDirection:"column", alignItems: 'center', justifyContent: 'center', alignContent:"center", width:scrWidth-130, maxHeight:135}}>
                <Text>{title}</Text>
                <Text style={{maxHeight:70}}>{descr}</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:scrWidth-130-20}}>
                    <Text>{"$" + cost.toFixed(2)}</Text>
                    <Button onPress={()=>{cart.push(props.off); updateCart(cart); Platform.OS === 'android'? ToastAndroid.show("Item Added to Cart", ToastAndroid.SHORT) :alert("Item Added to Cart")}} title="Add to Order"></Button>
                </View>
            </View>
        </View>
    )
}
}