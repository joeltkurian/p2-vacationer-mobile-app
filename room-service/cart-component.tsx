import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, Image, Button, FlatList } from "react-native";
import { Offering, Offerings } from "../dtos";

export default function CartComponent(props:{off:Offering[], setOff:Function}){

    const [offerings,setOfferings] = useState<Offerings>({items:[], quantities:[]});

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
        let cart:Offerings={items:[], quantities:[]};

        for(const i of off){
            const index = cart.items.findIndex(c => c.desc === i.desc)
            if(index != -1){
                cart.quantities[index]+=1;
            }else{
                cart.items.push(i);
                cart.quantities.push(1);
            }
        }
        return cart;
    }

    useEffect(()=>{
        setOfferings(convert(dummy));
    },[])

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;

    function total(offs:Offerings){
        let sum = 0;
        for(let i = 0; i < offs.items.length; i++){
            sum += offs.items[i].cost * offs.quantities[i];
        }
        return sum;
    }
    
    return(
        <View style={{alignContent:"center", paddingHorizontal:2, justifyContent:"flex-start"}}>
            <Text style={{alignSelf:"center"}}>Cart Component</Text>
            <FlatList data={offerings.items} renderItem={({item, index}) => offeringItem({off:item, qty:offerings.quantities[index]})} keyExtractor={(item) => item.desc}/>
            <Text style={{alignSelf:"center"}}>Total: ${total(offerings).toFixed(2)}</Text>
            <View style={{width:scrWidth-80, alignSelf:"center", paddingBottom:10}}>
            <Button onPress={() => {}} title="Place Order"></Button>
            </View>
        </View>
    )

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
                        <Button onPress={()=>{}} title="Remove"></Button>
                    </View>
                </View>
            </View>
        )}
        else{
            return(<View></View>)
        }
    }

}

