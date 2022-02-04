import React from "react";
import { Text, View, Image, Button, FlatList, ScrollView, Dimensions } from "react-native";
import { Offering } from '../dtos';

export default function CreateOrderComponent(){

    const dummy:Offering[] = [
        {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
        {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
        {desc:"Rice Balls*Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls", cost:14},
        {desc:"Shrimp Scampi*Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi", cost:24.75},
        {desc:"Shrimp Scampi*Lorem Ipsum About Shrismp Scampi", cost:24.75},
        {desc:"Shrimp Scampi*Lorems Ipsum About Shrimp Scampi", cost:24.75},
        {desc:"Shrimdp Scampi*Loresm fIpsum About Shrimp Scampi", cost:24.75},

    ];

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;

    return(
        <View style={{height:scrHeight, width:scrWidth, paddingTop:30, alignContent:"center", paddingLeft:2, paddingRight:2}}>
            <Text style={{alignSelf:"center"}}>Create Order Component</Text>
            <FlatList data={dummy} renderItem={({item}) => offeringItem({off:item})} keyExtractor={item => item.desc}/>
        </View>
    )
}

function offeringItem(props:{off:Offering}){
    const {desc, cost} = props.off;
    const [title, descr] = desc.split('*');
    const imageLink = 'https://jtkbackgroundimgs.blob.core.windows.net/jtkreimbursementbackgrounds/question-mark.png';

    const scrWidth = Dimensions.get('window').width;
    const scrHeight = Dimensions.get('window').height;

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
                    <Button onPress={()=>{}} title="Add to Order"></Button>
                </View>
            </View>
        </View>
    )
}