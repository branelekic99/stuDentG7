import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Text} from "react-native";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import News from "../screens/News";
import DrawerContent from "./DrawerContent";
import {useSelector} from "react-redux";
import Profile from "../screens/Profile";
import Header from "./Header";


const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const AuthStackScreen = ()=>(
    <AuthStack.Navigator headerMode={"none"}>
        <AuthStack.Screen name={"SignIn"} component={SignIn}/>
        <AuthStack.Screen name={"SignUp"} component={SignUp}/>
    </AuthStack.Navigator>
)
const DrawerScreen = ()=>(
    <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
        <Drawer.Screen name={"Home"} component={Home} options={({navigation})=>{
            return{
                headerShown:false,
            }
        }}/>
        <Drawer.Screen name={"News"} component={News} options={{headerShown:true,headerStyle:{
            }}}/>
        <Drawer.Screen name={"Gallery"} component={Gallery} options={{headerShown:true}}/>
        <Drawer.Screen name={"Profile"} component={Profile} options={{headerShown:true}}/>
    </Drawer.Navigator>
)
const RootStack = createStackNavigator();

const RootStackScreen = ({authenticated,guest})=>(

    <RootStack.Navigator headerMode={authenticated || guest ?"screen":"none"}>
        {authenticated || guest? <RootStack.Screen name={"App"} component={DrawerScreen} options={{headerShown:false}
            }/>:
            <RootStack.Screen name={"AuthScreen"} component={AuthStackScreen} options={{animationEnabled:false}}/> }
    </RootStack.Navigator>
)

const Navigation = ()=>{
    const {authenticated,guestMode} = useSelector(state=>state.auth);
    console.log("change ide");
    return (
        <NavigationContainer>
            <RootStackScreen authenticated={authenticated} guest={guestMode}/>
        </NavigationContainer>
    )
};

export default Navigation;
