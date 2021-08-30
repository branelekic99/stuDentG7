import React, {useState, useReducer, useCallback} from 'react';
import {View, Text, StyleSheet, Platform, Alert, TouchableOpacity, TextInput, StatusBar,KeyboardAvoidingView} from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import Input from "../components/Input";
import {useDispatch} from "react-redux";
import {sigUp} from "../redux-store/actions/auth";

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
}
const SignUp = ({navigation}) => {
    const dispatch = useDispatch();

    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            firstName:'',
            lastName:'',
            email:'',
            number:'',
            age:'',
        },
        inputValidity:{
            firstName: true,
            lastName: true,
            email:false,
            number: true,
            age:true,
        },
        formIsValid:false,
    });


    const onInputChange = useCallback((inputIdentifier,inputValue,inputValidity)=>{
        dispatchFormState({type:FORM_INPUT_UPDATE,value:inputValue,isValid:inputValidity,input:inputIdentifier});
    },[dispatchFormState])


    const handleSignIn = ()=>{
        navigation.pop();
    };
    const handleSignUp = ()=>{
       if(formState.formIsValid){
           dispatch(sigUp(formState.inputValues));
       }else{
           console.log("GRESKA!");
       }
    }
    const {colors} = useTheme();
    return (
        <KeyboardAvoidingView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>Register!</Text>
            </View>
            <Animatable.View animation={"fadeInUpBig"} style={[styles.footer, {backgroundColor: colors.background}]}>
                <Text style={[styles.footer_text, {color: colors.text}]}>First name</Text>
                <View style={styles.action_box}>
                    <Input
                        id={"firstName"}
                        keyboardType={"default"}
                        placeholder={"Your first name"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={""}
                        initiallyValid={true}
                        icon={<FontAwesome name={"user-o"} color={colors.text} size={20}/>}
                    />
                </View>

                <Text style={[styles.footer_text, {color: colors.text}]}>Last name</Text>
                <View style={styles.action_box}>
                    <Input
                        id={"lastName"}
                        keyboardType={"default"}
                        placeholder={"Your last name"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={""}
                        initiallyValid={true}
                        icon={<FontAwesome name={"user-o"} color={colors.text} size={20}/>}
                    />
                </View>

                <Text style={[styles.footer_text, {color: colors.text}]}>Email</Text>
                <View style={styles.action_box}>
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
                        initialValue={""}
                        initiallyValid={false}
                        icon={<Feather name={"mail"} color={colors.text} size={20}/>}
                    />
                </View>

                <Text style={[styles.footer_text, {color: colors.text}]}>Number</Text>
                <View style={styles.action_box}>
                    <Input
                        id={"number"}
                        keyboardType={"numeric"}
                        placeholder={"Your phone"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={""}
                        initiallyValid={true}
                        icon={<Feather name={"phone"} color={colors.text} size={20}/>}
                    />
                </View>
                <Text style={[styles.footer_text, {color: colors.text}]}>Age</Text>
                <View style={styles.action_box}>
                    <Input
                        id={"age"}
                        keyboardType={"numeric"}
                        placeholder={"Your age"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={""}
                        initialValue={""}
                        initiallyValid={true}
                        icon={<FontAwesome name={"user-o"} color={colors.text} size={20}/>}
                    />
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.signIn} onPress={handleSignUp}>
                        <Text style={[styles.textSign,{color:"#fff"}]}>Sing Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.signIn,{backgroundColor:"#e4f7f1"}]} onPress={handleSignIn}>
                        <Text style={[styles.textSign,{color:colors.text}]}>Sing In</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#009387"
    },
    header:{
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    header_text:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },
    footer:{
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    footer_text:{
        color: "#fff",
        fontSize: 18,
    },
    email:{
        flex:1,
        marginTop: Platform.OS === "ios"?0:-12,
        paddingLeft:10,
        color:"#05375a"
    },
    action_box:{
        flexDirection:"row",
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
        paddingBottom: 5,
    },
    error_message:{
        color:"#FF0000",
        fontSize:14,
    },
    buttons:{
        alignItems:"center",
        marginTop:10
    },
    signIn:{
        width:"100%",
        height:50,
        justifyContent: "center",
        alignItems:"center",
        borderRadius:10,
        backgroundColor:"#4dab8d",
        marginTop:20,
    }

})
export default SignUp;
