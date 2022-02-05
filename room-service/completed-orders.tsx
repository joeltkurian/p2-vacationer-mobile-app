import { Text, View } from "react-native";
import { ServiceRequest, Offering } from "../dtos";
import Accordion from 'react-native-collapsible/Accordion';
import { useState } from "react";

export default function CompletedOrders(){

    const [activeSections,updateSections] = useState([]);

    function renderTitle(section:ServiceRequest){
        return(
            <View>
                <Text>ID: {section.id}</Text>
            </View>
        )
    }

    function renderHeader(section:ServiceRequest){
        return(
            <View>
                <Text>Room #: {section.room}</Text>
            </View>
        )
    }

    function renderContent(section:ServiceRequest){
        
        const bill = total(section.requestedOffering)

        return(
            <View>
                <Text>Order ID: {section.id}</Text>
                <Text>Room #: {section.room}</Text>
                <Text>Ordered: {section.created}</Text>
                <Text>Status: {section.status}</Text>
                <Text>Order Total: ${bill.toFixed(2)}</Text>
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
        ]},{id: "fru", room: "300", created: 1000, status: "Completed", requestedOffering: [
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
    ]

    function total(offerings:Offering[]){
        let sum = 0;
        for(let off of offerings){
            sum += off.cost;
        }
        return sum;
    }

    return(
        <View>
            <Text>Completed orders component</Text>
            <Accordion activeSections={activeSections} sections={dummy} renderSectionTitle={renderTitle} renderHeader={renderHeader} renderContent={renderContent} onChange={() =>{updateSections(activeSections)}} expandMultiple={false}/>
        </View>
    )
}

function serviceItem(props:{request:ServiceRequest}){
    const [visible,setVisible] = useState(false);
}