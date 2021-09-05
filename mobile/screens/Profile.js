import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,Alert} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Input from "../components/Input";
import ChangePassword from "../components/ChangePassword";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {getUserById, updateProfile} from "../redux-store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state,action) =>{
    if(action.type === FORM_INPUT_UPDATE){
        const updateValues ={
            ...state.inputValues,
            [action.input]:action.value,
        };
        const updateValidity ={
            ...state.inputValidity,
            [action.input]:action.isValid
        }
        let updateFormIsValid = true;
        for(const key in updateValidity){
            updateFormIsValid = updateFormIsValid && updateValidity[key];
        }
        return {
            formIsValid:updateFormIsValid,
            inputValues:updateValues,
            inputValidity:updateValidity
        }
    }
    return state;
};

const Profile = ({navigation}) => {
    const profile=useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            firstName:profile.firstName,
            lastName:profile.lastName,
            email:profile.email,
            phoneNumber:profile.phoneNumber?.toString(),
            age:profile.age?.toString(),
        },
        inputValidity:{
            firstName: true,
            lastName: true,
            email:false,
            phoneNumber: true,
            age:true,
        },
        formIsValid:false,
    });
    const [showChangePassword,setShowChangePassword] = useState(false);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            const id = profile?.id;
            if(id){
                dispatch(getUserById(id));
            }
        });
        return unsubscribe;
    },[navigation]);

    const onInputChange = useCallback((inputIdentifier,inputValue,inputValidity)=>{
        dispatchFormState({type:FORM_INPUT_UPDATE,value:inputValue,isValid:inputValidity,input:inputIdentifier});
    },[dispatchFormState]);

    const handleUpdateProfile = async () =>{
        try{
            if(formState.formIsValid){
                const formData = new FormData();
                formData.append("age",formState.inputValues.age);
                formData.append("email",formState.inputValues.email);
                formData.append("firstName",formState.inputValues.firstName);
                formData.append("lastName",formState.inputValues.lastName);
                formData.append("phoneNumber",formState.inputValues.phoneNumber);
                await dispatch(updateProfile(formData,profile.id));
                //done show notification
                Alert.alert("Success","Porfile successefully updated!",[{text:"OK"}])
            }
        }catch (err){
            //show error
            Alert.alert("Error","Something went wrong! Please try again.",[{text:"OK"}])
            console.log(err.response.data);
        }
    };

    const handleUpdatePassword = ()=>{
        setShowChangePassword(true);
    };
    const handleChangePasswordModalClose = ()=>{
        setShowChangePassword(false);
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity>
                    <Image style={styles.image} source={require("../assets/user.png")} />
                </TouchableOpacity>
            </View>
            <Text>{profile.firstName} {profile.lastName}</Text>
            <View style={styles.profileDetails}>
                <Text style={styles.label}>Frist name</Text>
                <View style={styles.inputContainer}>
                    <Input
                        id={"firstName"}
                        keyboardType={"default"}
                        placeholder={"Your first name"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={formState.inputValues.firstName}
                        initiallyValid={true}
                        icon={<FontAwesome name={"user-o"} color={"gray"} size={20}/>}
                    />
                </View>
                <Text style={styles.label}>Last name</Text>
                <View style={styles.inputContainer}>
                    <Input
                        id={"lastName"}
                        keyboardType={"default"}
                        placeholder={"Your last name"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={formState.inputValues.lastName}
                        initiallyValid={true}
                        icon={<FontAwesome name={"user-o"} color={"gray"} size={20}/>}
                    />
                </View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <Input
                        email
                        required
                        id={"email"}
                        keyboardType={"email-address"}
                        placeholder={"Your email"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={"Please enter valid email address!"}
                        initialValue={formState.inputValues.email}
                        initiallyValid={true}
                        icon={<Feather name={"mail"} color={"gray"} size={20}/>}
                    />
                </View>
                <Text style={styles.label}>Number</Text>
                <View style={styles.inputContainer}>
                    <Input
                        id={"phoneNumber"}
                        keyboardType={"numeric"}
                        placeholder={"Your phone"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={formState.inputValues.phoneNumber}
                        initiallyValid={true}
                        icon={<Feather name={"phone"} color={"gray"} size={20}/>}
                    />
                </View>
                <Text style={styles.label}>Age</Text>
                <View style={styles.inputContainer}>
                    <Input
                        id={"age"}
                        keyboardType={"numeric"}
                        placeholder={"Your age"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={formState.inputValues.age}
                        initiallyValid={true}
                        icon={<FontAwesome name={"user-o"} color={"gray"} size={20}/>}
                    />
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButtons} onPress={handleUpdateProfile}>
                    <Text style={styles.actionText}>Update profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtons} onPress={handleUpdatePassword}>
                    <Text style={styles.actionText}>Change password</Text>
                </TouchableOpacity>
            </View>
            <ChangePassword show={showChangePassword} onClose={handleChangePasswordModalClose} id={profile.id}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        backgroundColor:"#e6e8e6"
    },
    imageContainer:{
        marginTop:10,
        width: '40%',
        height: '20%',
        borderRadius:100,
        overflow: 'hidden',
        borderWidth:3,
        borderColor:"white",

    },
    image:{
        width:"100%",
        height:"100%",
    },
    profileDetails:{
        width:"100%",
        padding:20,
    },
    inputContainer:{
        marginTop: 20,
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
    },
    label:{
        fontSize:18,
    },
    actionContainer:{
        width:"80%",
        alignItems:"center"
    },
    actionButtons:{
        width:"100%",
        height:50,
        backgroundColor:"#4dab8d",
        borderRadius: 20,
        alignItems: "center",
        justifyContent:"center",
        marginTop:10
    },
})
export default Profile;
