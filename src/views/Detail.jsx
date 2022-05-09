import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableHighlight,ScrollView} from 'react-native'
import * as Progress from 'react-native-progress';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

import colorsList from '../utils/Colors'

const sectionItem = [
    {
        idList:0,
        content:"Deadline dashboard trust group",
        date:new Date(),
        done: true,
    },
    {
        idList:1,
        content:"Final project Meanchine learning !!!",
        date:new Date(),
        done: true,
    },
    {
        idList:2,
        content:"Run for 5km ",
        date:new Date(),
        done: false,
    },
    {
        idList:3,
        content:"I'll try to update the docs to indicate this.",
        date:new Date(),
        done: false,
    },
    {
        idList:0,
        content:"Deadline dashboard trust group",
        date:new Date(),
        done: true,
    },
    {
        idList:1,
        content:"Final project Meanchine learning !!!",
        date:new Date(),
        done: true,
    },
    {
        idList:2,
        content:"Run for 5km ",
        date:new Date(),
        done: false,
    },
    {
        idList:3,
        content:"I'll try to update the docs to indicate this.",
        date:new Date(),
        done: false,
    },
    {
        idList:0,
        content:"Deadline dashboard trust group",
        date:new Date(),
        done: true,
    },
    {
        idList:1,
        content:"Final project Meanchine learning !!!",
        date:new Date(),
        done: true,
    },
    {
        idList:2,
        content:"Run for 5km ",
        date:new Date(),
        done: false,
    },
    {
        idList:3,
        content:"I'll try to update the docs to indicate this.",
        date:new Date(),
        done: false,
    }
]

const calcPercentTaskDone = (taskDone,totalTask) => {
  return (taskDone/totalTask)
}

export default function Detail({navigation}) {

    const [percentTaskDone,setPercentTaskDone] = useState(0)

    const goBackHandler = () => {
        navigation.goBack();
    }
    
    // aniamtion delay for display percent task done
    setTimeout(() => {
      setPercentTaskDone(calcPercentTaskDone(navigation.getParam('done'),navigation.getParam('totalWork')))
    }
    ,100)

  return (
    <View style={styles.main}>
      {/* HEADER DETAIL */}
      <View style={styles.header}>
        {/* back button */}
        <TouchableHighlight onPress={() => goBackHandler()}>
          <View>
            <Feather name="chevron-left" size={32} color={colorsList.white} />
          </View>
        </TouchableHighlight>

        {/* list name */}
        <Text style={styles.title}>{navigation.getParam('name')}</Text>
      
        {/* option button */}
        <View>
          <Feather name="more-vertical" size={26} color={colorsList.white} />
        </View>
      </View>

      {/* percent task done */}
      <View style={styles.percentTask}>
        <Progress.Bar 
          progress={percentTaskDone} 
          width={null} 
          color={colorsList.pink}
          borderRadius={10}
        />
      </View>
      {/* list task */}
      <View style={styles.content}>
        {/* LIST TO DO */}
        <ScrollView 
          contentContainerStyle={{
          display: "flex",
          flexWrap: "wrap", 
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >        
          {
            sectionItem.map((item,index) => {
              return (
                <View key={index} style={styles.todoItem}>
                  {/* ITEM TO DO */}
                  <TouchableHighlight 
                    onPress={() => { 
                      item.done == !item.done
                      console.log(item.done)
                    }}
                    underlayColor="#8C98CD"
                    style={styles.todoItemIcon}
                  >
                    {/* ICON */}
                    <Ionicons
                        name={ item.done ? "ios-checkmark-circle" : "ios-checkmark-circle-outline" }
                        size={30}
                        color={colorsList.pink}
                    />
                  </TouchableHighlight>
                  {/* CONTENT */}
                  <Text style={[
                    styles.todoItemText,
                    {
                      textDecorationLine: item.done ? "line-through" : "none",
                      opacity: item.done ? 0.5 : 1
                    }
                  ]}>
                    {item.content}
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    backgroundColor: colorsList.purple,
    display: 'flex',
    flex: 1
  },  
  header:{
    height:70,
    backgroundColor: colorsList.purple,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal:10
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colorsList.pink,
    fontWeight: 'bold',
  },
  content:{
    backgroundColor: colorsList.white,
    flex: 1,
    // marginTop: 60,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  percentTask:{
    paddingVertical:20,
    paddingHorizontal:30,
  },
  todoItem:{
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    width: "98%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colorsList.veryLightGray,
    marginVertical: 4,
    borderRadius: 24
  },
  todoItemText:{
    paddingRight:60,
    lineHeight: 25,
    fontSize: 18,
    fontWeight: '500'
  },
  todoItemIcon:{
    marginHorizontal:10,
    color: colorsList.pink,
    borderRadius:50,
    overflow: 'hidden'
  }
})