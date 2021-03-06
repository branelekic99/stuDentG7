import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORAGE_KEY, SERVER_ADRESA} from "../constants/variables";
import {Card,Title,Paragraph} from "react-native-paper";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const News = () => {
    const [newsData,setNewsData]= useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [selectedItem,setSelectedItem] = useState(null);
    const [selectedItemImage,setSelectedItemImage] = useState("");
    const [showNewsModal,setShowNewsModal] = useState(false);

    const fetchData = async ()=>{
        setIsLoading(true);
        const result = await axios.get(SERVER_ADRESA + "/get/news/paginated");
        console.log(result.data)
        setNewsData(result.data.rows);
        setIsLoading(false);
    };
    useEffect(()=>{
     fetchData();
    },[]);
    if(isLoading){
        return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"} color={"black"}/>
        </View>
    }
    const handleNewsDetails = (item,image)=>{
        setSelectedItem(item);
        setShowNewsModal(true);
        setSelectedItemImage(image);
    }
    return (
        <View style={styles.container}>
            <Modal transparent={true} animationType={"fade"} visible={showNewsModal}>
                <View style={styles.modalStyle}>
                    <View style={styles.closeButton}>
                        <TouchableOpacity onPress={()=>setShowNewsModal(false)}>
                            <FontAwesome name={"close"} color={"#484a48"} size={40}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.newsDetails}>
                        {selectedItemImage ? <Image source={{uri:selectedItemImage}} style={{width:"80%",height:200}}/>:
                            <Image source={require("../assets/default.jpg")} style={{width:"80%",height:200}}/>}
                        <View style={styles.newsContent}>
                            <Text style={styles.newsTitle}>{selectedItem?.title}</Text>
                            <ScrollView>
                                <Text style={styles.newsContentText}>{selectedItem?.content}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
                <FlatList
                    data={newsData}
                    onRefresh={fetchData}
                    refreshing={isLoading}
                    renderItem={({item})=>{
                        const {content,id,imageUrl,title} = item;
                        let imageurl = "";
                        if(imageUrl){
                            imageurl = SERVER_ADRESA + "/"+ imageUrl;
                        }
                        return(
                                <TouchableOpacity onPress={handleNewsDetails.bind(this,item,imageurl)}>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            {imageurl? <Card.Cover source={{ uri: imageurl }} />:<Card.Cover source={require("../assets/default.jpg") } />}
                                            <Title>{title}</Title>
                                        </Card.Content>
                                    </Card>
                                </TouchableOpacity>
                        )
                    }} keyExtractor={item=>item.id.toString()}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    card:{
        marginBottom:20,
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
        justifyContent: "flex-end",
        marginTop:60,
        marginRight:10,
    },
    newsDetails:{
        flex: 1,
        width:"100%",
        justifyContent:"flex-start",
        alignItems: "center",
        marginHorizontal:50,
        paddingBottom:40,
    },
    newsContent:{
        width:"80%",
        maxHeight:"70%",
        backgroundColor: 'rgba(86,84,84,0.8)',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
    },
    newsTitle:{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold",
        textTransform:"uppercase",
        marginLeft:20,
        marginBottom: 10,
    },
    newsContentText:{
        fontSize:16,
        color:"#fff",
        marginLeft: 20,
    },
})
export default News;
