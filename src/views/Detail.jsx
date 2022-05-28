import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, TouchableHighlight,TouchableOpacity,ScrollView,Modal,Animated} from 'react-native'
import * as Progress from 'react-native-progress';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Swipeable } from 'react-native-gesture-handler';

import AddTaskModal from '../components/AddTaskModal'
import SpeedDialAddTask from '../components/SpeedDialAddTask'

import colorsList from '../utils/Colors'

import { collection,getDoc,updateDoc, addDoc, query, where ,doc, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase'


const calcPercentTaskDone = (taskDone,totalTask) => {
  if(taskDone!==0 && totalTask!==0){
    return (taskDone/totalTask)
  }else{
    return 0
  }
}

const calcTaskDone = (taskList) => {
  let result = 0;
  taskList.map((task) => {
    task.doneStatus === true ? result++ : result
  })
  console.log(result)
  return result
}

export default function Detail({navigation}) {

  const [currentList,setCurrentList] = useState(null)

  const [percent,setPercent] = useState(0)

  useEffect(()=>{
    getListTask(navigation.getParam('id'))
  },[])

  // READ
  const getListTask = (idList) => {
      getDoc(doc(db, "todolist",idList))
      .then(docSnap => {
          if (docSnap.exists()) {
            setCurrentList(docSnap.data())
            setPercent(calcPercentTaskDone(parseInt(docSnap.data().totalDoneTask),parseInt(docSnap.data().totalTaskQuantity)))
          } else {
            console.log("No such document!");
          }
      })
  }    

  // CREATE NEW TASK
  
  const createNewTask = (newTaskList) => {
    updateDoc(doc(db, "todolist",navigation.getParam('id')),{
      id:"",
      name:currentList.name,
      taskList:[...newTaskList],
      totalDoneTask:calcTaskDone(currentList.taskList),
      totalTaskQuantity:currentList.taskList.length+1,
    })
    .then(() => {
      // rerender list
      getListTask(navigation.getParam('id'));
      updateTask([...newTaskList])
    })
    .then(() => {
      console.log("create new task successfully!");
    })
    .catch((error) => {
      console.error("Error cannot create new task: ", error);
    })
  }

  const addList = (nameList) => {
    // clone to temp list with spread
    let tempList = [...currentList?.taskList]

    // create new list
    tempList.push({
        name:nameList,
        doneStatus:false,
    })

    console.log(tempList)

    // update new list
    updateTask([...tempList])
  }

  // UPDATE
  const updateTask = (newTaskList) => {
    updateDoc(doc(db, "todolist",navigation.getParam('id')),{
      id:"",
      name:currentList.name,
      taskList:[...newTaskList],
      totalDoneTask:calcTaskDone(currentList.taskList),
      totalTaskQuantity:currentList.taskList.length,
    })
    .then(() => {
      // rerender list
      getListTask(navigation.getParam('id'))
    })
    .then(() => {
      console.log("update successfully!");
    })
    .catch((error) => {
      console.error("Error cannot update task: ", error);
    })
  }

  // DELETE TASK
  const deleteTask = (index) => {
    // clone to temp list with spread
    let tempList = [...currentList?.taskList]

    // create new list
    tempList.splice(index, 1);

    // update new list

    console.log(tempList)
    updateTask([...tempList])
  }


  // HANDLE DONE TASK TOGGLE
  const handleToggleDoneTask = (index) => {

    const tempList = [...currentList?.taskList]

    tempList[index].doneStatus = !tempList[index].doneStatus

    updateTask([...tempList])
  }

  // toggle modal
  const [addTaskModalState,setAddTaskModalState] = useState(false)

  // toggle speedail
  const [addTaskSpeedDail,setAddTaskSpeedDail] = useState(false)

  const goBackHandler = () => {
      navigation.goBack();
  }

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
        <Text style={styles.title}>{currentList?.name}</Text>
      
        {/* option button */}
        <View>
          <Feather name="more-vertical" size={26} color={colorsList.white} />
        </View>
      </View>

      {/* PERCENT BAR */}
      <View style={styles.percentTask}>
        <Progress.Bar 
          progress={percent} 
          width={null} 
          color={colorsList.pink}
          borderRadius={10}
        />
      </View>

      {/* LIST TASK */}
      <View style={styles.content}>
        {/* list to do */}
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
            
            currentList?.taskList?.map((item,index) => {

              // ACTION SWIPER
              const rightActions = (dragX,index) => {
                return (
                  <TouchableOpacity onPress={() => deleteTask(index)}>
                    <Animated.View style={styles.deleteBtn}>
                      <Animated.Text>
                        Delete
                      </Animated.Text>
                    </Animated.View>
                  </TouchableOpacity>
                )
              }

              return (
                <Swipeable 
                  key={index} 
                  renderRightActions={(_,dragX) => rightActions(dragX,index)}
                  style={styles.item}
                  >
                  <View 
                    style={
                      [
                        styles.todoItem,
                        {
                          backgroundColor: item.doneStatus ? colorsList.veryLightGray : colorsList.lightGray
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
                            name={ item.doneStatus ? "ios-checkmark-circle" : "ios-checkmark-circle-outline" }
                            size={30}
                            color={colorsList.pink}
                        />
                      </TouchableHighlight>

                      {/* CONTENT */}
                      <Text style={[
                        styles.todoItemText,
                        {
                          textDecorationLine: item.doneStatus ? "line-through" : "none",
                          opacity: item.doneStatus ? 0.5 : 1
                        }
                      ]}>
                        {item.name}
                      </Text>
                  </View>
                </Swipeable>
              )
            })
          }
        </ScrollView>
      </View>

      <SpeedDialAddTask 
          addTaskModalState={addTaskModalState} 
          setAddTaskModalState={setAddTaskModalState}
          addTaskSpeedDail={addTaskSpeedDail}
          setAddTaskSpeedDail={setAddTaskSpeedDail}
      />

      {/* modal add list*/}
      <Modal
          animationType="slide"
          visible={addTaskModalState}
      >
          <View>
              <AddTaskModal 
                  closeModal={() => 
                  { 
                    setAddTaskModalState(!addTaskModalState)
                    setAddTaskSpeedDail(!addTaskSpeedDail)}
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
  item:{
    display: 'flex',
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
    minWidth: "98%",
    maxWidth: "98%",
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
  },
  deleteBtn:{
    flex:1,
    backgroundColor: colorsList.red,
    height:'90%',
    marginTop: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: 80,
    borderRadius:30,
    color: colorsList.white,
  }
})