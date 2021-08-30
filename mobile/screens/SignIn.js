import React, {useState, useReducer, useCallback,useEffect} from 'react';
import {View, Text, StyleSheet, Platform, Alert, TouchableOpacity, TextInput, StatusBar,KeyboardAvoidingView} from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Input from "../components/Input";

import {useTheme} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {signIn} from "../redux-store/actions/auth";

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

const SignIn = ({navigation}) => {
    const dispatch = useDispatch();
    const [formError,setFormError] = useState(false);

    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            email:'',
            password:'',
        },
        inputValidity:{
            email:false,
            password: false,
        },
        formIsValid:false,
    });

    const {colors} = useTheme();

    useEffect(()=>{
        dispatch(signIn({email:"branisalekic60@gmail.com",password:"123"}));
    },[]);

    const handleSignIn = async ()=>{
        try{
            if(formState.formIsValid){
               await dispatch(signIn(formState.inputValues));
            }
        }catch (err){
            setFormError(err.message);
        }
    }

    const handleSignUp = ()=>{
        navigation.push("SignUp");
    }
    const onInputChange = useCallback((inputIdentifier,inputValue,inputValidity)=>{
        dispatchFormState({type:FORM_INPUT_UPDATE,value:inputValue,isValid:inputValidity,input:inputIdentifier});
    },[dispatchFormState])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#009387"} barStyle={"light-content"}/>
            <View style={styles.header}>
                <Text style={styles.header_text}>Log In!</Text>
            </View>
            <Animatable.View animation={"fadeInUpBig"} style={[styles.footer, {backgroundColor: colors.background}]}>
                <View style={styles.errorContainer}>
                    {formError && <Text style={styles.authError}>{formError}</Text>}
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

                <Text style={[styles.footer_text,{color:colors.text,marginTop:35}]}>Password</Text>
                <View style={styles.action_box}>
                    <Input
                        secureTextEntry
                        required
                        id={"password"}
                        keyboardType={"default"}
                        placeholder={"Password"}
                        placeholderTextColor={"#666666"}
                        autoCapitalize={"none"}
                        onInputChange={onInputChange}
                        errorText={"Password is required!"}
                        initialValue={""}
                        initiallyValid={false}
                        icon={<Feather name={"lock"} color={colors.text} size={20}/>}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.signIn} onPress={handleSignIn}>
                        <Text style={[styles.textSign,{color:"#fff"}]}>Sing In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.signIn,{backgroundColor:"#e4f7f1"}]} onPress={handleSignUp}>
                        <Text style={[styles.textSign,{color:colors.text}]}>Sing Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387"
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    header_text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    footer_text: {
        color: "#fff",
        fontSize: 18,
    },
    action_box:{
        flexDirection:"row",
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
        paddingBottom: 5,
    },
    email:{
        flex:1,
        marginTop: Platform.OS === "ios"?0:-12,
        paddingLeft:10,
        color:"#05375a"
    },
    errorContainer:{
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:10,
    },
    error_message:{
        color:"#FF0000",
        fontSize:14,
    },
    authError:{
        color:"#FF0000",
        fontSize:18,
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
export default SignIn;
