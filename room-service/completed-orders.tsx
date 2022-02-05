import { FlatList, Text, View } from "react-native";
import { ServiceRequest, Offering } from "../dtos";
import Accordion from 'react-native-collapsible/Accordion';
import { scrHeight, scrWidth } from "./room-service-container";
import { useState } from "react";
import { idText, isTemplateExpression } from "typescript";

export default function CompletedOrders(){

    const [activeSections,updateSections] = useState([]);

    function renderTitle(section:ServiceRequest){
        return(
            <View>
                {/* <Text>ID: {section.id}</Text> */}
            </View>
        )
    }

    function renderHeader(section:ServiceRequest){
        return(
            <View style={{padding:5, backgroundColor:section.status === 'Ordered'? "#0ff9":section.status === 'Processing' ? "#00f9":section.status === 'Cancelled'?"#f009":"#0f09"}}>
                <Text style={{alignSelf:"center"}}>Room #: {section.room}</Text>
            </View>
        )
    }

    function renderContent(section:ServiceRequest){
        
        const bill = total(section.requestedOffering);
        const items = section.requestedOffering.length;
        const tall = (items*5)+30;

        function renderItem(props:{offering:Offering}){
            const {desc, cost} = props.offering;
            const [title, rest] = desc.split('*');
            return(
                <View style={{flexDirection:"row"}}>
                    <Text>{title}</Text>
                    <Text>${cost.toFixed(2)}</Text>
                </View>
            )
        }

        return(
            <View>
                <Text>Order ID: {section.id}</Text>
                <Text>Room #: {section.room}</Text>
                <Text>Ordered: {section.created}</Text>
                <Text>Status: {section.status}</Text>
                <Text>Order Total: ${bill.toFixed(2)}</Text>
                <Text>Order Contents:</Text>
                <FlatList data={section.requestedOffering} renderItem={({item}) => renderItem({offering:item})} keyExtractor={item => item.desc}/>
            </View>
        )
    }

    const dummy:ServiceRequest[] = [
        {id: "foo", room: "300", created: 1000, status: "Ordered", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50},
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrimp Scampi", cost:24.75},
            {desc:"Rice Balls*Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls Lorem Ipsum About Rice Balls", cost:14},
            {desc:"Shrimp Scampi*Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi Lorem Ipsudm About Shrimp Scampi", cost:24.75},
            {desc:"Shrimp Scampi*Lorem Ipsum About Shrismp Scampi", cost:24.75},
            {desc:"Shrimp Scampi*Lorems Ipsum About Shrimp Scampi", cost:24.75},
            {desc:"Shrimdp Scampi*Loresm fIpsum About Shrimp Scampi", cost:24.75}
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
            {desc:"Shrimp Scampi*Lorems Ipsum About Shrimp Scampi", cost:24.75},
            {desc:"Shrimdp Scampi*Loresm fIpsum About Shrimp Scampi", cost:24.75}
        ]},
        {id: "dfsa", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
        ]},
        {id: ",kiiuy", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
        ]},
        {id: "ewqr", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
        ]},
        {id: "xcvb", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
        ]},
        {id: "asd", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
        ]},
        {id: "adsfg", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
        ]},
        {id: "lioui", room: "300", created: 1000, status: "Processing", requestedOffering: [
            {desc:"Chicken Parm*Lorem Ipsum About Chicken Parm", cost:21.50}
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
        <View style={{height:scrHeight-20, width:scrWidth, paddingTop:30, alignItems:"center", backgroundColor:"#aaa"}}>
            <Text>Completed orders component</Text>
            <View style={{alignItems:"center"}}>
            <Accordion activeSections={activeSections} sections={dummy} renderSectionTitle={renderTitle} renderHeader={renderHeader} renderContent={renderContent} onChange={(section:any) =>{updateSections(section)}} expandMultiple={true}/>
            </View>
        </View>
    )
}

function serviceItem(props:{request:ServiceRequest}){
    const [visible,setVisible] = useState(false);
}