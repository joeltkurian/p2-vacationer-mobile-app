import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ServiceRequest, Offering, Offerings, Reservation, returnNewService } from "../../dtos";
import Accordion from 'react-native-collapsible/Accordion';
import { scrHeight, scrWidth } from "./dimenstions";
import { useEffect, useState } from "react";
import { borderColor, loginBtn, loginBtnActive, mainBackgroundColor } from "../../styling";
import { formatted_date } from "../../userContext";

export default function CompletedOrders(props: { reservation: Reservation }) {

    const [activeSections, updateSections] = useState([]);

    const [orderHistory, setOrderHistory] = useState<ServiceRequest[]>([]);
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://20.121.74.219:3000/servicerequests');
            const fullList: ServiceRequest[] = await response.json();
            const filtered: ServiceRequest[] = fullList.filter(item => item.room === props.reservation.room);
            setOrderHistory(filtered);
        })();
    }, [update])

    async function cancelRequest(section: ServiceRequest) {
        const action = { status: "Cancel" };
        const response = await fetch('http://20.121.74.219:3000/servicerequests/' + section.id, {
            method: "PATCH",
            body: JSON.stringify(action),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json()
        if (response.status === 200) {
            setUpdate(!update);
        }
        else {
            console.log(response);
            alert("Request could not be updated.");
        }
    }

    function renderHeader(section: ServiceRequest) {
        let total = 0;
        for (const c of section.requestedOfferings) {
            total += c.cost;
        }

        return (
            <View style={[styles.amountStatContainer, { opacity: section.status === 'Cancel' ? 0.5 : 1, backgroundColor: section.status === 'Ordered' ? "rgba(0,0,0,0.4)" : section.status === 'Processing' ? "rgba(255,255,0,0.5)" : section.status === 'Cancel' ? "rgba(255,0,0,0.5)" : "rgba(0,255,0,0.5)" }]}>
                <Text style={styles.headerTxt}>Amount: ${(Math.round(total * 100) / 100).toFixed(2)}</Text>
                <Text style={[styles.headerTxt, { alignSelf: "flex-end" }]}>Status: {section.status}</Text>
                {section.status === "Ordered" || section.status === "Processing" ?
                    <Pressable onPress={() => cancelRequest(section)} style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgba(100,0,0,0.7)'
                                : 'rgba(255,0,0,0.7)'
                        },
                        styles.cancelBtn
                    ]}>
                        <Text style={styles.cancelBtnTxt}>Cancel Order</Text>
                    </Pressable>
                    : <></>}
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

        const bill = total(section.requestedOfferings);
        const condensed = convert(section.requestedOfferings);

        function renderItem(props: { offering: Offering, quantity: number }) {
            const { desc, cost } = props.offering;
            const service = returnNewService(desc);
            return (
                <View style={{ flexDirection: "column", padding: 5 }}>
                    <Text style={{ fontWeight: 'bold', }}>{service.desc}:</Text>
                    <View style={styles.border} />
                    <View style={{ paddingTop: 5, paddingLeft: "35%", }}>
                        <Text> Quantity: {props.quantity}</Text><Text>Amount:  ${(cost * props.quantity).toFixed(2)}</Text>
                    </View>
                </View>
            )
        }

        return (<View style={{ opacity: section.status === 'Cancel' ? 0.5 : 1 }}>
            <View style={styles.insideContent}>
                <Text style={styles.text}>{formatted_date(section.created)}</Text>
                <Text style={styles.text}>Status: {section.status}</Text>
                <Text style={styles.text}>Order Total: ${bill.toFixed(2)}</Text>
            </View>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>Order Contents:</Text>
            <FlatList style={styles.itemContent} data={condensed.items} renderItem={({ item, index }) => renderItem({ offering: item, quantity: condensed.quantities[index] })} keyExtractor={(item) => item.desc} />
        </View>)
    }

    return (
        orderHistory.length === 0 ? <Text>No Orders Present for this Room</Text> :
            <View style={{ maxHeight: "98%", width: '100%', alignItems: "center", paddingTop: 20 }}>
                <View style={{ width: '100%', height: '100%' }}>
                    <Accordion sectionContainerStyle={styles.accordItem} activeSections={activeSections} sections={orderHistory} renderHeader={renderHeader} renderContent={renderContent} onChange={(section: any) => { updateSections(section) }} expandMultiple={false} renderAsFlatList={true} />
                </View>
            </View >

    )
}

const styles = StyleSheet.create({
    accordItem: {
        paddingVertical: 10,
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
        backgroundColor: mainBackgroundColor,
        borderWidth: 2,
        borderColor: borderColor,
    },
    cancelBtn: {
        borderRadius: 8,
        margin: 5,
        padding: 3,
        borderWidth: 1,
        borderColor: "rgba(255,0,0,1)",
    },
    cancelBtnTxt: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    amountStatContainer: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: borderColor,
        borderRadius: 10,
        padding: 5,
        justifyContent: "space-between",
    },
    headerTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    insideContent: {
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 10,
    },
    border: {
        borderWidth: 2,
        width: '100%',
        borderColor: '#000',
    },
    itemContent:
    {
        width: "100%",
        borderRadius: 10,
        backgroundColor: mainBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontStyle: 'italic',
    }
})