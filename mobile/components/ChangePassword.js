import React,{useState}from 'react';
import {View, Alert,Text,StyleSheet,TextInput,TouchableOpacity} from "react-native";
import {Modal,Provider,Portal} from "react-native-paper";
import {useDispatch} from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {updateUserPassword} from "../redux-store/actions/auth";

const ChangePassword = ({show=false,onClose,id=0}) => {
    const dispatch = useDispatch();
    const [errorMessage,setErrorMessage] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [newPassword2,setNewPassword2] = useState("");

    const handlePasswordUpdate = async ()=>{
        if(!oldPassword || !newPassword || !newPassword2){
            setErrorMessage("Please fill all 3 fields!");
            return;
        }

        if(newPassword !== newPassword2){
            setErrorMessage("New passwords doesn't match!");
            return;
        }
        if(id > 0){
            try{
                const data ={
                    oldPassword:oldPassword,
                    newPassword:newPassword,
                };
                await dispatch(updateUserPassword(data,id));
                Alert.alert("Success","Password changed!",[{text:"OK"}]);
                onClose();
            }catch (err){
                console.log(err.message)
            }

        }
    }
    return (
        <Provider>
            <Portal>
                    <Modal
                        style={styles.modalContainer}
                        onDismiss={onClose}
                        visible={show}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(currentValue=>!currentValue);
                        }}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title}>Change your password!</Text>
                            <Text style={styles.errorMsg}>{errorMessage}</Text>
                            <View style={styles.inputBox}>
                                <Text style={styles.inputText}>Old password</Text>
                                <TextInput placeholder={"Please enter your old password!"} style={styles.inputField} secureTextEntry={true} onChangeText={setOldPassword}/>
                            </View>
                            <View style={styles.inputBox}>
                                <Text style={styles.inputText}>New Password</Text>
                                <TextInput placeholder={"Please enter your new password!"} style={styles.inputField} secureTextEntry={true} onChangeText={setNewPassword}/>
                            </View>
                            <View style={styles.inputBox}>
                                <Text style={styles.inputText}>Confirm new password</Text>
                                <TextInput placeholder={"Please enter your new password!"} style={styles.inputField} secureTextEntry={true} onChangeText={setNewPassword2}/>
                            </View>
                            <View style={styles.actionButtonContainer}>
                                <TouchableOpacity  style={styles.actionButton} onPress={handlePasswordUpdate}><Text>Update</Text></TouchableOpacity>
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
    modalContent:{
        width: 300,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
        padding:20,
    },
    title:{
        color:"black",
        fontSize:20,
        paddingBottom:10,
    },
    inputBox:{
        width:"100%",
        borderBottomWidth:1,
        marginVertical:10,
    },
    inputField:{
        color:"#05375a",
        height:20,
        marginVertical:10,
    },
    actionButtonContainer:{
        width:"90%",
        alignItems:"center"
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
    errorMsg:{
        color:"red",
        fontSize: 15,
    }
})
export default ChangePassword;
