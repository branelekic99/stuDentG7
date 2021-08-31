import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar} from "react-native";
import Feather from 'react-native-vector-icons/Feather';

const Home = ({navigation}) => {
    const handleMenuPress = ()=>{
        navigation.openDrawer();
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={"transparent"} />
            <ImageBackground source={require("../assets/home-image.jpg")} resizeMode={"cover"} style={styles.imageBackgroundContainer}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={handleMenuPress}>
                            <Feather name={"menu"} color={"black"} size={40}/>
                        </TouchableOpacity>
                    </View>
                   <View style={styles.titleContainer}>
                       <Text style={styles.title}>StuDent</Text>
                   </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.makeAppointment}>
                        <Text style={styles.makeAppointmentText}>Naruci se</Text>
                    </TouchableOpacity>
                    <Text style={styles.message}>Ne dopustiste da vasi zubi propadaju!</Text>
                    <Text style={styles.message}>Narucite se odmah!</Text>
                </View>
            </ImageBackground>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    menu:{
        marginTop:50,
        marginHorizontal: 10
    },
    imageBackgroundContainer:{
        flex:1,
        // justifyContent:"center",
    },
    title:{
        fontSize:40,
        fontWeight:"bold",
        color:"#fff",
        // textTransform:"uppercase"
    },
    titleContainer:{
        flex:1,
        alignItems:"center",
        justifyContent: "flex-start",
        paddingTop:50,
    },
    bottomView:{
        flex:1,
        alignItems:"center",
        justifyContent: "flex-end",
        marginBottom:20,
    },
    wellcomeMessage:{
        fontSize: 18,
        marginHorizontal:20,
        marginVertical:10,
    },
    makeAppointment:{
        backgroundColor:"#009688",
        borderRadius:40,
        width:300,
        height:60,
        fontSize:20,
        justifyContent:"center",
        alignItems: "center",
        elevation:8,
        marginBottom: 5,
    },
    makeAppointmentText:{
        fontSize:20,
        color:"#fff",
        textTransform:"uppercase",
        fontWeight: "bold",
        textAlign:"center",
    },
    message:{
        color:"#fff",
    }
})
export default Home;
