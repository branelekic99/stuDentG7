import React,{useState}from 'react';
import {View, Alert,Text,StyleSheet,TextInput,TouchableOpacity} from "react-native";
import {Modal,Provider,Portal} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";

const MakeAppointment = ({item,onClose,show,refreshData}) => {

    const [descriptionValue,setDescriptionValue] = useState("");

    const handleRequest = async ()=>{
        const {id} = item;
        try{
            const data = {
                description:descriptionValue,
                apointmentId:id,
            }
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.post(SERVER_ADRESA + '/patient/create/request',data,{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            Alert.alert("Success","Appointment request successfully sent!",[{text:"OK"}]);
            onClose();
            refreshData();

        }catch (err){
            console.log(err);
        }
    };

    return (
        <Provider>
            <Portal>
                <Modal
                    style={styles.modalContainer}
                    onDismiss={onClose}
                    visible={show}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.description}>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <TextInput style={styles.descriptionInput} multiline={true} onChangeText={setDescriptionValue} placeholder={"Enter optional message.."}/>
                        </View>
                        <View style={styles.actionButtonContainer}>
                            <TouchableOpacity  style={styles.actionButton} onPress={handleRequest}><Text>Send request</Text></TouchableOpacity>
                            <TouchableOpacity style={{...styles.actionButton,backgroundColor:"#ffc75e"}} onPress={onClose}><Text>Close</Text></TouchableOpacity>
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
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
        padding:20,
    },
    actionButtonContainer:{
        width:"90%",
        alignItems:"center"
    },
    description:{
        width:"100%"
        // borderBottomWidth:2,
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
        maxHeight:200,
        minHeight:200,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },

})
export default MakeAppointment;
