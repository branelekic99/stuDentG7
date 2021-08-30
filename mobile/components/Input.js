import React,{useReducer,useEffect} from 'react';
import {TextInput, View, StyleSheet, Platform, Text} from "react-native";
import {useTheme} from 'react-native-paper';
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";

const INPUT_CHANGE = "INPUT_CHANGE";
const LOST_FOCUS = "LOST_FOCUS";

const inputReducer = (state,action) =>{
    switch (action.type){
        case INPUT_CHANGE:
            return {
                ...state,
                value:action.value,
                isValid:action.isValid
            }
        case LOST_FOCUS:
            return {
                ...state,
                touched:true,
            }
        default:
            return state;
    }
};

const Input = (props) => {
    const {colors} = useTheme();
    const {id,onInputChange} = props;

    const [inputState,dispatch] = useReducer(inputReducer,{
        value:props.initialValue?props.initialValue:"",
        isValid:props.initiallyValid,
        touched:false,
    });

    useEffect(()=>{
        onInputChange(id,inputState.value,inputState.isValid);
    },[inputState,onInputChange,id]);

    const onChangeHandler = (text) =>{
       let isValid=true;
       const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(props.required && text.trim().length === 0){
           isValid=false;
       }
       if(props.email && !emailRegex.test(text.toLowerCase())){
           isValid=false;
       }
       dispatch({type:INPUT_CHANGE,value:text,isValid:isValid})

    };
    const lostFocusHandler = ()=>{
        dispatch({type:LOST_FOCUS})
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Animatable.View animation={"bounceIn"}>
                    {props.icon}
                </Animatable.View>
                <TextInput
                    {...props}
                    style={[styles.input,{color:colors.text}]}
                    value={inputState.value}
                    onChangeText={onChangeHandler}
                    onBlur={lostFocusHandler}
                />
                <Animatable.View animation={"bounceIn"}>
                    {inputState.isValid?<Feather name={"check-circle"} color={"green"} size={20}/>:
                        <Feather name={"x-circle"} color={"red"} size={20}/>}
                </Animatable.View>
            </View>
            <View styles={styles.errorContainer}>
                {!inputState.isValid && inputState.touched && (<Animatable.View animation={"fadeInLeft"} duration={500}>
                    <Text style={styles.errorMessage}>{props.errorText}</Text>
                </Animatable.View>)}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
      flex:1,
        marginTop:-25,
        marginBottom:20
    },
    inputContainer:{
      flex:1,
        flexDirection:"row",
        marginVertical:20
    },
    input:{
        flex:1,
        paddingLeft:10,
        color:"#05375a",
        height:20,
    },
    errorContainer:{
        flex:1,
    },
    errorMessage:{
        color:"#FF0000",
        fontSize:14,
    }
})
export default Input;
