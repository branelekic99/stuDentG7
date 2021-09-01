import React, {useEffect,useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity,ActivityIndicator} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";
import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";

const Schedule = () => {
    const [categories, setCategories] = useState([]);
    const [appointments,setAppointments] = useState([]);
    const [error,setError] = useState("");
    const [selectedValue,setSelectedValue] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const fetchCategories = async()=>{
        try{
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.get(SERVER_ADRESA + "/get/categories/",{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            setCategories(result.data);
            if(result.data.length > 0){
                setSelectedValue(result.data[0].id);
            }
        }catch (err){
            setError("Something went wrong!")
        }
    };
    const fetchAvailableAppointments = async(id)=>{
        try{
            setIsLoading(true);
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.get(SERVER_ADRESA + `/get/available_apointments/category/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            setIsLoading(false);
            setAppointments(result.data);
        }catch (err){
            setError("Something went wrong!");
        }
    };

    useEffect(()=>{
        fetchCategories();
    },[]);

    useEffect(()=>{
        if(selectedValue)
            fetchAvailableAppointments(selectedValue);
    },[selectedValue]);
    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(item)=>setSelectedValue(item)}
                    style={styles.picker}
                    itemStyle={styles.picker}
                    mode={"dialog"}
                >
                    {categories.map((item)=>{
                        return <Picker.Item value={item.id} label={item.name} key={item.id} />
                    })}
                </Picker>
            </View>
            {isLoading?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size={"large"} color={"black"}/>
            </View>: <FlatList
                data={appointments}
                onRefresh={fetchAvailableAppointments.bind(this,selectedValue)}
                refreshing={isLoading}
                ListEmptyComponent={<View style={styles.noData}><Text style={styles.noDataText}>No data</Text></View>}
                renderItem={({item})=>{
                    console.log(item)
                    return <View style={styles.appointment}>
                        <View style={styles.date}>
                            <Text style={styles.text}>Date</Text>
                            <Text style={styles.text}>{new Date(item.startTime).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.startTime}>
                            <Text style={styles.text}>Start time</Text>
                            <Text style={styles.text}>{new Date(item.startTime).toLocaleTimeString()}</Text>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionText}>Rezervisi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }} keyExtractor={item=>item.id.toString()}/>}
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    pickerContainer:{
        marginHorizontal:30,
        width:"80%",
        height:40,
        justifyContent:"center",
        borderBottomWidth:2,
        marginTop:10,
    },
    picker:{
        fontSize:20,
        fontWeight:"bold",
        textTransform:"uppercase",
    },
    appointment:{
        margin:10,
        elevation:1,
        borderRadius:5,
        padding:10,
        justifyContent:"center",
        alignItems: "center",
    },
    startTime:{
        flexDirection:"row",
        justifyContent: "space-between",
        width:"100%",
    },
    date:{
        flexDirection:"row",
        justifyContent: "space-between",
        width:"100%",
    },
    action:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#009688",
        width:"50%",
        borderRadius:10,
        marginVertical:10,
        height: 40,
    },
    text:{
        fontSize: 18,
        marginHorizontal: 5,
        textTransform: "uppercase"
    },
    actionButton:{
        borderRadius: 10,
    },
    actionText:{
        fontSize:18,
        textTransform:"uppercase",
        fontWeight: "bold",
        color:"#fff",
    },
    noData:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    noDataText:{
        fontSize:20,
        marginTop: 20,
        fontWeight:"bold",
    }
})
export default Schedule;
