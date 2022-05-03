import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity } from 'react-native'
import React from 'react'

import {AntDesign} from "@expo/vector-icons"

import Header from './Header'

export default function AddListModal({closeModal}) {
  return (
    <KeyboardAvoidingView style={styles.containerAdd}>
        <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
          <AntDesign 
            name="close" 
            color= '#08c'
            style={styles.icon}
          >
          </AntDesign>
        </TouchableOpacity>
        
        <View styles={styles.titleAdd}>
          <Text >AddListModal</Text>
        </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  containerAdd:{
    position: 'relative',
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },  
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  titleAdd:{
    fontSize: 100,
    fontWeight: "500",
  },
  icon:{
    fontSize: 100,
  }
})