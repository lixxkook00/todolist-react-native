import React from 'react';
import { StyleSheet,View ,Text,Image,TouchableHighlight} from 'react-native';

import colorsList from '../utils/Colors'

import EvilIcons from '@expo/vector-icons/EvilIcons';

function Header({navigation}) {
    const goBackHandler = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.header}>
            <TouchableHighlight onPress={() => goBackHandler()}>
                <EvilIcons name="navicon" size={32} color={colorsList.white} />
            </TouchableHighlight>
            <Text >
                <View >
                    <Text style={styles.name}>conchochuyen</Text>
                </View>
            </Text>
            <Image
                style={styles.avt}
                source={
                    require('../../assets/avt-shiba.jpeg')
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:"rgba(000, 000, 000 , 0.15)",
        color: "#ffffff",
        height: 70,
        paddingHorizontal: 15,
        paddingTop: 15 ,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    avt:{
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: 'cover'
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color:"#fff"
    }
})

export default Header;