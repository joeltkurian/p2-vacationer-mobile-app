import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ServiceRequest, Offering, Offerings, Reservation } from "../../dtos";
import Accordion from 'react-native-collapsible/Accordion';
import { scrHeight, scrWidth } from "./dimenstions";
import { useEffect, useState } from "react";

export default function CompletedOrders(props:{reservation:Reservation}) {

    const [activeSections, updateSections] = useState([]);

    const [orderHistory, setOrderHistory] = useState<ServiceRequest[]>([]);
    const [update,setUpdate] = useState<boolean>(false);

    useEffect(()=>{
        (async()=>{
            const response = await fetch('http://20.121.74.219:3000/servicerequests');
            const fullList:ServiceRequest[] = await response.json();
            const filtered:ServiceRequest[] = fullList.filter(item=>item.room === props.reservation.room);
            console.log(filtered);
            setOrderHistory(filtered);
            alert("orders fetched successfully");
        })();
    },[update])

    async function cancelRequest(section:ServiceRequest){
        const response = await fetch('http://20.121.74.219:3000/servicerequests'+section.id,{
            method:"PATCH",
            body:JSON.stringify({action:"Cancel"}),
            headers:{ 'content-type': 'application/json',
                        'Accept': 'application/json' }
        });
        if(response.status === 200){
            setUpdate(!update);
        }
        else{
            alert("Request could not be updated.");
        }
    }

    function renderTitle(section: ServiceRequest) {
        return (
            <View style={{ height: 0 }}>
                <Text style={{ fontSize: 10 }}>ID: {section.id}</Text>
            </View>
        )
    }

    function renderHeader(section: ServiceRequest) {
        return (
            <View style={{ flexDirection: "row", padding: 5, backgroundColor: section.status === 'Ordered' ? "#0ff9" : section.status === 'Processing' ? "#00f9" : section.status === 'Cancelled' ? "#f009" : "#0f09", height: 30, justifyContent: "space-between" }}>
                <Text style={{ alignSelf: "flex-start" }}>Room #: {section.room}</Text>
                <Text style={{ alignSelf: "flex-end" }}>Status: {section.status}</Text>
                {section.status === "Ordered" || section.status === "Processing" ? 
                    <Pressable style={{height:"100%", backgroundColor:"#f009"}} onPress={()=>cancelRequest(section)}>
                        <Text>Cancel Order</Text>
                    </Pressable>
                :<></>}
            </View>
        )
    }

    function renderContent(section: ServiceRequest) {

        function total(offerings: Offering[]) {
            let sum = 0;
            for (let off of offerings) {
                sum += off.cost;
            }
            return sum;
        }

        function convert(off: Offering[]): Offerings {
            let cart: Offerings = { items: [], quantities: [] };

            for (const i of off) {
                const index = cart.items.findIndex(c => c.desc === i.desc)
                if (index != -1) {
                    cart.quantities[index] += 1;
                } else {
                    cart.items.push(i);
                    cart.quantities.push(1);
                }
            }
            return cart;
        }

        const bill = total(section.requestedOffering);
        const condensed = convert(section.requestedOffering);

        function renderItem(props: { offering: Offering, quantity: number }) {
            const { desc, cost } = props.offering;
            const [title, rest] = desc.split('*');
            return (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>{title}:</Text>
                    <Text>x{props.quantity}     ${(cost * props.quantity).toFixed(2)}</Text>
                </View>
            )
        }

        return (
            <View style={{ alignItems: "center", backgroundColor: "#fff3" }}>
                <Text>Order ID: {section.id}</Text>
                <Text>Room #: {section.room}</Text>
                <Text>Ordered: {section.created}</Text>
                <Text>Status: {section.status}</Text>
                <Text>Order Total: ${bill.toFixed(2)}</Text>
                <Text>Order Contents:</Text>
                <FlatList style={{ width: scrWidth - 100, backgroundColor: "#fff5" }} data={condensed.items} renderItem={({ item, index }) => renderItem({ offering: item, quantity: condensed.quantities[index] })} keyExtractor={(item) => item.desc} />
            </View>
        )
    }

    return (
    orderHistory.length ===0 ?<></>:<View style={{ maxHeight: "98%", width: scrWidth, alignItems: "center", paddingTop: 30 }}>
        <Text style={{ paddingBottom: 15 }}>Completed orders component</Text>
        <View style={{ alignItems: "center", width: scrWidth, maxHeight: scrHeight, height: "100%" }}>
            <Accordion containerStyle={{}} sectionContainerStyle={styles.accordItem} activeSections={activeSections} sections={orderHistory} renderSectionTitle={renderTitle} renderHeader={renderHeader} renderContent={renderContent} onChange={(section: any) => { updateSections(section) }} expandMultiple={false} renderAsFlatList={true} />
        </View>
    </View>
        
    )
}

const styles = StyleSheet.create({
    accordItem: {
        overflow: "visible",
        paddingVertical: 3,
    }
})