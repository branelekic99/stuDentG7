import React, {useEffect, useState} from 'react';
import {
    View,
    FlatList,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions, ActivityIndicator, Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";
import axios from "axios";

const {width} = Dimensions.get('window');

const Gallery = () => {
    const [images,setImages] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
    const [selectedImage,setSelectedImage] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const fetchData = async ()=>{
        try{
            setIsLoading(true);
            const result = await axios.get(SERVER_ADRESA + "/get/gallery");
            console.log(result.data)
            setImages(result.data);
            setIsLoading(false);
        }catch (err){
            console.log(err);
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);
    if(isLoading){
        return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"} color={"black"}/>
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Modal transparent={true} animationType={"fade"} visible={modalVisible}>
                <View style={styles.modalStyle}>
                    <View style={styles.closeButton}>
                        <TouchableOpacity onPress={()=>setModalVisible(false)}>
                            <FontAwesome name={"close"} color={"black"} size={40}/>
                        </TouchableOpacity>
                    </View>
                    <Image source={{uri:selectedImage}} style={{width:"85%",height:"50%"}} />
                </View>
            </Modal>
        <View style={styles.container}>
            <FlatList data={images}
                      horizontal={false}
                      numColumns={3}
                      onRefresh={fetchData}
                      refreshing={isLoading}
                      ListEmptyComponent={<View style={styles.noData}><Text style={styles.noDataText}>No data</Text></View>}
                      renderItem={({item})=>{
                  let imageUrl = SERVER_ADRESA +"/"+ item.imageUrl;
                          return<View style={styles.imageContainerStyle}>
                              <TouchableOpacity key={item.id}
                                  onPress={() => {
                                              setSelectedImage(imageUrl);
                                              setModalVisible(true);
                                          }}>
                                  <Image source={{uri:imageUrl}} style={styles.imageStyle} />
                                  </TouchableOpacity>
                          </View>
            }}
            keyExtractor={item=>item.id.toString()}
            />
        </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    titleStyle: {
        padding: 16,
        fontSize: 20,
        color: 'white',
        backgroundColor: 'green',
    },
    imageContainerStyle: {
        margin: 1,
    },
    imageStyle: {
        height: 120,
        width: width / 3,
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain',
    },
    closeButtonStyle: {
        width: 25,
        height: 25,
        top: 50,
        right: 20,
        position: 'absolute',
    },
    modalStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButton:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"flex-end",
        marginRight:20,
        marginVertical:20,
    } ,
    noData:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
});

export default Gallery;
