import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Button
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";
import axios from "axios";
import FastImage from "react-native-fast-image";

const {width} = Dimensions.get('window');

const Gallery = () => {
    const [images,setImages] = useState([]);

    // console.log(images);
    const fetchData = async ()=>{
        const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        const result = await axios.get(SERVER_ADRESA + "/get/gallery",{
            headers:{
                'Content-Type':"application/json",
                "x-access-token": token,
            }
        });
        setImages(result.data);
    };

    useEffect(()=>{
        fetchData();
    },[]);
    return (
        <View style={styles.container}>
            <FlatList data={images}
                      horizontal={false}
                      numColumns={3}
                      renderItem={({item})=>{
                  let imageUrl = item.imageUrl?.replace("http://127.0.0.1:8000",SERVER_ADRESA);
                          return<View style={styles.imageContainerStyle}>
                              <TouchableOpacity key={item.id}
                                  onPress={() => {
                                              // showModalFunction(true, item.src);
                                          }}>
                                  <Image source={{uri:imageUrl}} style={styles.imageStyle} />
                                  </TouchableOpacity>
                          </View>
            }}
            keyExtractor={item=>item.id.toString()}
            />
        </View>
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
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
        width: 25,
        height: 25,
        top: 50,
        right: 20,
        position: 'absolute',
    },
});

export default Gallery;
