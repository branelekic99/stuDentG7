import React, {useEffect,useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import {useSelector} from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";
import RequestModal from "../components/RequestModal";

const Requests = () => {
    const profile = useSelector(state=>state.auth);
    const [requests,setRequests] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [selectedRequest,setSelectedRequest] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const fetchRequests = async()=>{
        try{
            setIsLoading(true);
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.get(SERVER_ADRESA + "/get/requests/patient",{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            setRequests(result.data);
            setIsLoading(false);
        }catch (err){
            console.log(err);
        }
    };

    useEffect(()=>{
        fetchRequests();
    },[])
    const handleClose = ()=>{
        setShowModal(false);
    };
    const handleRequest = (selectedItem) =>{
        setSelectedRequest(selectedItem);
        setShowModal(true);
    }
    if(isLoading){
        return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"} color={"black"}/>
        </View>
    }
    return (
        <View style={styles.container}>
            <FlatList data={requests}  onRefresh={fetchRequests} refreshing={isLoading}
                      ListEmptyComponent={<View style={styles.noDataIndicator}>
                          <Text style={styles.noDataTextIndicator}>No data</Text>
                      </View>}
                      renderItem={({item})=>{
                          const categoryName = item?.Apointment?.Schedule?.Category?.name;
                return <TouchableOpacity onPress={handleRequest.bind(this,item)}>
                    <View style={styles.requestContainer}>
                        <View>
                            <Text style={{...styles.text,marginBottom:10,color:"gray"}}>{categoryName}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>Date</Text>
                            <Text style={styles.text}>{new Date(item.Apointment?.startTime).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>Time</Text>
                            <Text style={styles.text}>{new Date(item.Apointment?.startTime).toLocaleTimeString()}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>Status</Text>
                            <Text style={styles.text}>{item.approved?"Approved":"Requested"}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            }} keyExtractor={item=>item.id.toString()}/>
            <RequestModal show={showModal} onClose={handleClose} item={selectedRequest} />
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    requestContainer:{
        margin:10,
        elevation:1,
        backgroundColor: "#fff",
        borderRadius:5,
        padding:10,
        justifyContent:"center",
        alignItems: "center",
    },
    box:{
        flexDirection:"row",
        width:"100%",
        justifyContent: "space-between",
    },
    text:{
        fontSize:20,
    },
    noDataIndicator:{
        alignItems:"center",
    },
    noDataTextIndicator:{
        fontSize:20,
        marginVertical:10,
    }
})
export default Requests;
