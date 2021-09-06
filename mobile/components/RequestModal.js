import React,{useState,useEffect}from 'react';
import {View, Alert, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from "react-native";
import {Modal,Provider,Portal} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";
import { Chip } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RequestModal = ({item,onClose,show}) => {

    const [messages,setMessages] = useState([]);
    const [messageText,setMessageText] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const fetchMessages = async ()=>{
        try{
            const {id} = item;
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            setIsLoading(true);
            const result = await axios.get(SERVER_ADRESA + `/get/request/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            setMessages(result.data.messages);
            setIsLoading(false);
        }catch (err){
            console.log(err);
        }
    }
    useEffect(()=>{
       if(!item)
           return;
        fetchMessages();

    },[item]);
    const handleSendMessage = async()=>{
        try{
            if(!messageText)
                return
            const obj ={
                message:messageText,
            }
            const {id} = item;
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.post(SERVER_ADRESA+`/send_message/request/${id}`,obj,{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            Alert.alert("Success","Message sent!",[{text:"OK"}]);
            onClose();
        }catch (err){
            console.log(err);
        }
    }
    return (
        <Provider>
            <Portal>
                <Modal
                    style={styles.modalContainer}
                    onDismiss={onClose}
                    visible={show}
                >
                    <View style={styles.modalContent}>
                        <View>
                            <View style={styles.description}>
                                <Text style={styles.descriptionTitle}>Description sent to doctor: </Text>
                                <Text>{item?.description}</Text>
                            </View>
                            <View style={styles.chatBox}>
                                <Text style={styles.title}>Messages</Text>
                                <FlatList
                                    data={messages}
                                    onRefresh={fetchMessages}
                                    refreshing={isLoading}
                                    ListEmptyComponent={<View style={styles.noData}><Text style={styles.noDataText}>No data</Text></View>}
                                    renderItem={({item})=>{
                                        return <View style={styles.message}>
                                            <Text style={styles.sender}>{item.patientId?"You":"Doctor"}</Text>
                                            <View style={styles.textContainer}>
                                                <Text style={styles.messageText}>{item.message}</Text>
                                            </View>
                                        </View>
                                    }} keyExtractor={item=>item.id.toString()}/>
                            </View>
                        </View>
                        <View style={styles.modalFooter}>
                            <View style={styles.cont}>
                                <View style={styles.inputBox}>
                                    <TextInput style={styles.descriptionInput} onChangeText={setMessageText} placeholder={"Enter message"} multiline={true}/>
                                    <TouchableOpacity style={styles.sentIcon} onPress={handleSendMessage}>
                                        <Ionicons
                                            name="md-send"
                                            color={"black"}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.actionButtonContainer}>
                                <TouchableOpacity style={{...styles.actionButton,backgroundColor:"#ffc75e"}} onPress={onClose}><Text>Close</Text></TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>
            </Portal>
        </Provider>
    );
};
const styles = StyleSheet.create({
    modalContainer:{
        justifyContent:"center",
        alignItems:"center",
    },
    actionButton:{
        width:"100%",
        borderRadius:10,
        marginVertical: 10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#24ea6e",
        height: 40,
    },
    modalContent:{
        width: 350,
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"white",
        padding:20,
        height: 600,
    },
    actionButtonContainer:{
        width:"90%",
        alignItems:"center",
    },
    description:{
        width:"100%",
        borderBottomWidth:1,
        marginBottom: 2,
    },
    descriptionTitle:{
        fontSize:20,
        marginBottom: 10,
    },
    descriptionInput:{
        backgroundColor:"#e1e1e1",
        fontSize: 16,
        borderRadius: 5,
        padding: 5,
        flexDirection:"row",
        width:"90%",
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        minHeight:50,
        maxHeight: 50,
    },
    chatBox:{
        width:"100%",
        maxHeight: 300,
    },
    message:{
        // backgroundColor:"red",
    },
    title:{
        fontSize:18,
        marginBottom:5,
    },
    textContainer:{
        // backgroundColor:"green",
        elevation:1,
        margin:10,
        padding:5,
        borderRadius:1,
        width:"95%",
        minWidth:"95%",
        maxWidth:"95%",
    },
    messageText:{

    },
    sender:{
        marginLeft:10,
        fontSize:15,
        fontWeight:"bold",
    },
    modalFooter:{
        width:"100%",
        height:150,
        justifyContent:"space-between",
        alignItems:"center",
    },
    inputBox:{
        width:"100%",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    cont:{
        width:"100%",
    },
    sentIcon:{
        marginLeft: 10,
    }

})
export default RequestModal;
