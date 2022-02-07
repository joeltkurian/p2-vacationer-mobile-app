import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { ServiceRequest, Offering, Offerings } from "../dtos";
import Accordion from 'react-native-collapsible/Accordion';
import { scrHeight, scrWidth } from "./dimenstions";
import { useState } from "react";

export default function CompletedOrders(){

    const [activeSections,updateSections] = useState([]);

    function renderTitle(section:ServiceRequest){
        return(
            <View style={{height:0}}>
                <Text style={{fontSize:10}}>ID: {section.id}</Text>
            </View>
        )
    }

    function renderHeader(section:ServiceRequest){
        return(
            <View style={{padding:5, backgroundColor:section.status === 'Ordered'? "#0ff9":section.status === 'Processing' ? "#00f9":section.status === 'Cancelled'?"#f009":"#0f09", height:30}}>
                <Text style={{alignSelf:"center"}}>Room #: {section.room}</Text>
            </View>
        )
    }

    function renderContent(section:ServiceRequest){
        
        const bill = total(section.requestedOffering);
        const condensed = convert(section.requestedOffering);

        function renderItem(props:{offering:Offering, quantity:number}){
            const {desc, cost} = props.offering;
            const [title, rest] = desc.split('*');
            return(
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text>{title}:</Text>
                    <Text>x{props.quantity}     ${(cost*props.quantity).toFixed(2)}</Text>
                </View>
            )
        }

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

        return(
            <View style={{alignItems:"center", backgroundColor:"#fff3"}}>
                <Text>Order ID: {section.id}</Text>
                <Text>Room #: {section.room}</Text>
                <Text>Ordered: {section.created}</Text>
                <Text>Status: {section.status}</Text>
                <Text>Order Total: ${bill.toFixed(2)}</Text>
                <Text>Order Contents:</Text>
                <FlatList style={{width:scrWidth-100, backgroundColor:"#fff5"}} data={condensed.items} renderItem={({item, index}) => renderItem({offering:item, quantity:condensed.quantities[index]})} keyExtractor={(item) => item.desc}/>
            </View>
        )
    }

    const dummy:ServiceRequest[] = [
        {id: "foo", room: "300", created: 1000, status: "Ordered", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
            {desc:"Rice Balls*Lorem Ipsum About Rice Balls", cost:14},
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
            
        ]},
        {id: "fro", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
        ]},
        {id: "fru", room: "300", created: 1000, status: "Completed", requestedOffering: [
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75}
        ]},{id: "fra", room: "300", created: 1000, status: "Completed", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
            {desc:"Rice Balls*Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls", cost:14},
        ]},{id: "fre", room: "300", created: 1000, status: "Cancelled", requestedOffering: [
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrismp Scampi", cost:24.75},
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrismp Scampi", cost:24.75},
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrismp Scampi", cost:24.75}
        ]},
    ]

    function total(offerings:Offering[]){
        let sum = 0;
        for(let off of offerings){
            sum += off.cost;
        }
        return sum;
    }

    return(
        <View style={{height:scrHeight-50, width:scrWidth, paddingTop:30, alignItems:"center", backgroundColor:"#aaa"}}>
            <Text>Completed orders component</Text>
            <View style={{alignItems:"center", width:scrWidth, height:scrHeight-100}}>
                <Accordion containerStyle={{}} sectionContainerStyle={styles.accordItem} activeSections={activeSections} sections={dummy} renderSectionTitle={renderTitle} renderHeader={renderHeader} renderContent={renderContent} onChange={(section:any) =>{updateSections(section)}} expandMultiple={false} renderAsFlatList={true}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    accordItem:{
        overflow:"visible",
        paddingVertical:3,
    }
})