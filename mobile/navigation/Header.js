import React from "react";
import {StyleSheet,Text,View} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const Header = ({navigation,title}) =>{

    return <View style={styles.header}>
        {/*icon for menu*/}
        <View>
            <Text style={styles.headerText}>
                {title}
            </Text>
        </View>
    </View>
};
//#009387
const styles = StyleSheet.create({
    header:{
        width:"100%",
        height:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    headerText:{
        fontWeight:"bold",
        fontSize:20,
        // letterspacing:1
    }

})
export default Header;