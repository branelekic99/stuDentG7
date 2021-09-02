import React, {useEffect} from 'react';
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";

const Requests = () => {
    const profile=useSelector(state=>state.auth);

    const fetchRequests = async()=>{
        try{
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.get(SERVER_ADRESA + "/get_requests/patient",{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            console.log(result.data);
        }catch (err){
            console.log(err);
        }
    };

    useEffect(()=>{
        fetchRequests();
    },[])

    return (
        <View>
            <Text>Testing123</Text>
        </View>
    );
};

export default Requests;
