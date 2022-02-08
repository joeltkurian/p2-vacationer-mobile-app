import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, Image, Button, FlatList, Platform, ToastAndroid } from "react-native";
import { Offering, Offerings } from "../dtos";

export default function CartComponent(props:{off:Offering[], setOff:Function}){

    const [offerings,setOfferings] = useState<Offerings>({items:[], quantities:[]});

    const cart:Offering[] = props.off;
    const setCart:Function = props.setOff;

    const dummy:Offering[] = [
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
        {desc:"Rice Balls*Lorem Ipsum About Rice Balls", cost:14},
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},  
    ];

    function convert(off:Offering[]):Offerings{
        let myCart:Offerings={items:[], quantities:[]};
        

        for(const i of off){
            const index = myCart.items.findIndex(c => c.desc === i.desc)
            if(index != -1){
                myCart.quantities[index]+=1;
            }else{
                myCart.items.push(i);
                myCart.quantities.push(1);
            }
        }
        return myCart;
    }

    useEffect(()=>{
        const sortedOffs = props.off.sort((a, b) => a.desc < b.desc ? -1 : a.desc > b.desc ? 1 : 0);
        setOfferings(convert(sortedOffs));
    },[props.off])

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;

    function total(offs:Offerings){
        let sum = 0;
        for(let i = 0; i < offs.items.length; i++){
            sum += offs.items[i].cost * offs.quantities[i];
        }
        return sum;
    }

    function offeringItem(props:{off:Offering, qty:number}){
        const {desc, cost} = props.off;
        const [title, descr] = desc.split('*');
        const imageLink = 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/question-mark.png';
    
        const scrWidth = Dimensions.get('window').width;
    
        if(props.qty !== 0){
            return(
                <View style={{flexDirection:"row", width:"100%", height:135}}>
                    <View style={{flexDirection:"column", height:128, width:128,}}>
                        <Image style={{height:128, width:128}} source={{uri:imageLink}}/>
                    </View>
                    <View style={{flexDirection:"column", alignItems: 'center', justifyContent: 'center', alignContent:"center", width:scrWidth-130, maxHeight:135}}>
                        <Text>{title}</Text>
                        <Text style={{maxHeight:70}}>{descr}</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:scrWidth-130-20}}>
                            <Text>{"$" + (cost*props.qty).toFixed(2)}</Text>
                            <Text>x{props.qty}</Text>
                            <Button onPress={()=>{
                                for(let i = 0; i < cart.length; i++){
                                    if(cart[i] === props.off){
                                        cart.splice(i,1);
                                        break;
                                    }
                                }
                                setCart(cart);
                                setOfferings(convert(cart))
                                Platform.OS === 'android'? ToastAndroid.show("Item Removed from Cart", ToastAndroid.SHORT) :alert("Item Removed from Cart")
                                }} title="Remove"></Button>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return(<View></View>)
        }
    }
    
    return(
        <View style={{maxHeight:scrHeight, height:"100%", width:scrWidth, alignItems:"center", paddingTop:20}}>
            <Text style={{alignSelf:"center"}}>Cart Component</Text>
            <FlatList data={offerings.items} renderItem={({item, index}) => offeringItem({off:item, qty:offerings.quantities[index]})} keyExtractor={(item) => item.desc}/>
            <Text style={{alignSelf:"center"}}>Total: ${total(offerings).toFixed(2)}</Text>
            <View style={{width:scrWidth-80, alignSelf:"center",}}>
            <Button onPress={() => {Platform.OS === 'android'? ToastAndroid.show("Order Submitted!", ToastAndroid.SHORT) :alert("Order submitted!")}} title="Place Order"></Button>
            </View>
        </View>
    )
}

