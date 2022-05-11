import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableHighlight,ScrollView,Modal} from 'react-native'
import * as Progress from 'react-native-progress';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

import AddTaskModal from '../components/AddTaskModal'
import SpeedDialAddList from '../components/SpeedDialAddList'

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
]

const calcPercentTaskDone = (taskDone,totalTask) => {
  return (taskDone/totalTask)
}

export default function Detail({navigation}) {

    const [percentTaskDone,setPercentTaskDone] = useState(0)

    const [data,setData] = useState([...sectionItem])

    // toggle modal
    const [listModalState,setListModalState] = useState(false)

    // toggle speedail
    const [openSpeedDail,setOpenSpeedDail] = useState(false)

    const goBackHandler = () => {
        navigation.goBack();
    }

    const handleToggleDoneTask = (index) => {
        const tempData = [...data]
        tempData[index].done = !tempData[index].done
        setData(tempData)
    }
    
    const addList = (nameList) => {
        // clone to temp list with spread
        let tempList = [...data]

        // create new list
        tempList.push({
            id:tempList.length,
            content:nameList,
            done:true,
        })

        // update new list
        setList(tempList)
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

      {/* PERCENT BAR */}
      <View style={styles.percentTask}>
        <Progress.Bar 
          progress={percentTaskDone} 
          width={null} 
          color={colorsList.pink}
          borderRadius={10}
        />
      </View>

      {/* LIST TASK */}
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
            data.map((item,index) => {
              return (
                <View 
                  key={index} 
                  style={
                    [
                      styles.todoItem,
                      {
                         backgroundColor: item.done ? colorsList.veryLightGray : colorsList.lightGray
                      }
                    ]
                    }>

                  {/* ITEM TO DO */}
                  <TouchableHighlight 
                    onPress={() => { 
                      handleToggleDoneTask(index)
                    }}
                    underlayColor= {colorsList.pink}
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

      <SpeedDialAddList 
                    listModalState={listModalState} 
                    setListModalState={setListModalState}
                    openSpeedDail={openSpeedDail}
                    setOpenSpeedDail={setOpenSpeedDail}
                />

                {/* modal add list*/}
                <Modal
                    animationType="slide"
                    visible={listModalState}
                    >
                        <View>
                            <AddTaskModal 
                                closeModal={() => 
                                { toggleModalState()
                                    setOpenSpeedDail(!openSpeedDail)}
                                }
                                addList={addList}
                            />
                        </View>
                </Modal>
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