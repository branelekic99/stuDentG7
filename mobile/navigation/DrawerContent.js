import React from "react";
import {View,StyleSheet} from "react-native";
import {DrawerContentScrollView,DrawerItem} from "@react-navigation/drawer";
import {Avatar,Title,Caption,Drawer,useTheme} from "react-native-paper";
import {signOut} from "../redux-store/actions/auth";
import {useDispatch,useSelector} from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";

const DrawerContent = (props)=>{
    const {authenticated,firstName,lastName,email} = useSelector(state=>state.auth)
    const paperTheme = useTheme();
    const dispatch = useDispatch();
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
              <View style={styles.drawerContent}>
                  <View style={styles.userInfoSection}>
                      <View style={{flexDirection:'row',marginTop: 15}}>
                          <Avatar.Image
                              source={{
                                  uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Arh-avatar.jpg'
                              }}
                              size={50}
                          />
                          <View style={{marginLeft:15, flexDirection:'column'}}>
                              <Title style={styles.title}>{firstName?firstName:"Guest"} {lastName?lastName:""}</Title>
                              <Caption style={styles.caption}>{email?email:"no-email"}</Caption>
                          </View>
                      </View>
                  </View>

                  <Drawer.Section stlyes={styles.drawerSection}>
                      <DrawerItem
                          icon={({color, size}) => (
                              <Icon
                                  name="home-outline"
                                  color={color}
                                  size={size}
                              />
                          )}
                          label="Home"
                          onPress={() => {props.navigation.navigate('Home')}}
                      />
                      {authenticated && <DrawerItem
                          icon={({color, size}) => (
                              <Icon
                                  name="account-outline"
                                  color={color}
                                  size={size}
                              />
                          )}
                          label="Profile"
                          onPress={() => {props.navigation.navigate('Profile')}}
                      />}
                      <DrawerItem
                          icon={({color, size}) => (
                              <Icon name="image"
                                      color={color}
                                      size={size}/>
                          )}
                          label="Gallery"
                          onPress={() => {props.navigation.navigate('Gallery')}}
                      />
                      <DrawerItem
                          icon={({color, size}) => (
                              <FontAwesome
                                  name="newspaper-o"
                                  color={color}
                                  size={size}
                              />
                          )}
                          label="News"
                          onPress={() => {props.navigation.navigate('News')}}
                      />
                      <DrawerItem
                          icon={({color, size}) => (
                              <Fontisto
                                  name="calendar"
                                  color={color}
                                  size={size}
                              />
                          )}
                          label="Schedule"
                          onPress={() => {props.navigation.navigate('Schedule')}}
                      />
                  </Drawer.Section>
              </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {dispatch(signOut())}}
                />
            </Drawer.Section>
        </View>
    )
};
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 12,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
export default DrawerContent;
