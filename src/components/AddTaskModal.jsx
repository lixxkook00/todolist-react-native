import React, {useState} from 'react'
import { 
        TouchableWithoutFeedback,
        StyleSheet, 
        Text, 
        View, 
        KeyboardAvoidingView,
        TouchableOpacity,
        TextInput,
        Keyboard } 
  from 'react-native'

import {AntDesign} from "@expo/vector-icons"

import colorsList from '../utils/Colors'

export default function AddTaskModal({closeModal,addList}) {

  const [nameList,setNameList] = useState("")

  const handleSubmitAddList = () => {
    addList(nameList)
    closeModal()
  }

  // useEffect(()=>{
  //   console.log(nameList)
  // },[nameList])

  return (
    <TouchableWithoutFeedback style={styles.modal} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.containerAdd} behavior="padding" >
          {/* btn close modal */}
          <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
            <AntDesign 
              name="close" 
              color = {colorsList.purple}
              style={styles.icon}
            >
            </AntDesign>
          </TouchableOpacity>
          
          {/* title */}
          <View style={styles.titleBG}>
            <Text style={styles.titleAdd}>Add task</Text>
          </View>

          {/* input */}
          <View style={{alignItems: 'stretch',width: "90%",color: colorsList.pink}}>
            <TextInput 
              style={styles.input} 
              placeholder="Type name for new list"
              placeholderTextColor={colorsList.pink}
              value={nameList}
              onChangeText = {text => setNameList(text)}
            />
          </View>

          {/* button submit */}
          <TouchableOpacity style={styles.createBtn} onPress={() => handleSubmitAddList()}>
            <Text style={styles.createBtnText}>ADD</Text>
          </TouchableOpacity>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  containerAdd:{
    position: 'relative',
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },  
  closeBtn: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 2
  },
  titleAdd:{
    fontSize: 25,
    fontWeight: "800",
    color: colorsList.purple,
    alignSelf: "center",

  },
  icon:{
    fontSize: 30,
  },
  input:{
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorsList.purple,
    borderWidth: 2.5,
    borderRadius: 4,
    height: 50,
    marginVertical: 15,
    paddingHorizontal: 10,
    color: colorsList.lightPink,
    fontWeight: "500",
    fontSize:16,
  },
  createBtn:{
    backgroundColor: colorsList.pink,
    height:50,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom:20
  },
  createBtnText:{
    color: colorsList.purple,
    fontWeight: "800",
  },
  titleBG:{
    backgroundColor: colorsList.lightGray,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop:60,
    paddingBottom: 20
  }
})