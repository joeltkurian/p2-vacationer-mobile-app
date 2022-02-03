import React from "react";
import { Text, View, Image, Button, FlatList, ScrollView } from "react-native";
import { Offering } from '../dtos';

export default function CreateOrderComponent(){

    const dummy:Offering[] = [
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
        {desc:"Rice Balls*Lorem Ipsum About Rice Balls", cost:14}
    ];

    return(
        <ScrollView style={{height:'100%', width:'100%', paddingTop:30}}>
            <Text>Create Order Component</Text>
            <FlatList data={dummy} renderItem={({item}) => offeringItem({off:item})} keyExtractor={item => item.desc}/>
        </ScrollView>
    )
}

function offeringItem(props:{off:Offering}){
    const {desc, cost} = props.off;
    const [title, descr] = desc.split('*');
    const imageLink = 'https://jtkbackgroundimgs.blob.core.windows.net/jtkreimbursementbackgrounds/question-mark.png';

    return(
        <View style={{flexDirection:"row", paddingTop:5}}>
            <View style={{flexDirection:"column"}}>
                <Image style={{height:128, width:128}} source={{uri:imageLink}}/>
            </View>
            <View style={{flexDirection:"column", alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                <Text>{title}</Text>
                <Text>{descr}</Text>
                <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
                    <Text>{cost}</Text>
                    <Button onPress={()=>{}} title="Add to Order"></Button>
                </View>
            </View>
        </View>
    )
}