import React,{useState,useEffect} from 'react';

import AddListModal from '../components/AddListModal'
import SpeedDialAddList from '../components/SpeedDialAddList'

import colorsList from '../utils/Colors'
import Header from '../components/Header'

import { collection,getDocs, addDoc} from "firebase/firestore";
import {db} from '../../firebase'

import { Swipeable } from 'react-native-gesture-handler';

import { 
        View,
        TouchableHighlight,
        StyleSheet,
        Text,
        Modal,
        ScrollView,
        TouchableOpacity,
        Animated
    } 
from 'react-native';


function Home({navigation}) {

    // CRUD WITH FIREBASE

    // CREATE
    const createList = (nameList) => {
        addDoc(collection(db, "todolist"), {
            id: "",
            name: nameList,
            taskList: [],
            totalDoneTask:0,
            totalTaskQuantity:0,
        })
        .then(() => {
            // rerender list
            getLists()
        })
        .then(() => {
            console.log("create new list successfully!");
        })
        .catch((error) => {
            console.error("Error cannot create new list: ", error);
        });
    }

    // list section data
    const [list,setList] = useState([])

    const getLists = () => {
        let result = []
        getDocs(collection(db, "todolist"))
        .then(docSnap => {
            // console.log(typeof docSnap)
            docSnap.forEach((doc) => {
                // get id
                let idTemp = (doc._document.key.path.segments[6])

                // push list infor
                result.push({
                    id: idTemp,
                    name:doc.data().name,
                    taskList:doc.data().taskList,
                    totalDoneTask:doc.data().totalDoneTask,
                    totalTaskQuantity:doc.data().totalTaskQuantity,
                })
            });
            return result;
        })
        .then(
            result => {
                setList(result);
            }
        )
    }

    useEffect(() => {
        getLists()
    })


    // toggle modal listModalState
    const [addListModalState,setAddListModalState] = useState(false)

    // toggle speedail openSpeedDail
    const [addListSpeedDail,setAddListSpeedDail] = useState(false)


    const categoryItemHandler = (section) => {
        navigation.navigate('Detail',section)
    }

    const toggleModalState = () => {
        setAddListModalState(!addListModalState)
    }

    const toggleSpeedDial = () => {
        setAddListSpeedDail(!addListSpeedDail)
    }

    return (
        <View style={styles.content}>
            <Header/>
            <View style={styles.home}>
                <ScrollView 
                    contentContainerStyle={{
                        display: "flex",
                        flexWrap: "wrap", 
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start", }}>
                {
                    list.map((section,index) => {

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
                                style={styles.item}
                                key={index}
                                renderRightActions={(_,dragX) => rightActions(dragX,index)}
                                >
                                <View>
                                    <TouchableHighlight 
                                    style={styles.categoryItem}
                                    underlayColor="#8C98CD" 
                                    onPress={() => categoryItemHandler(section)} 
                                    >
                                        <View style={styles.button}>
                                            <Text style={styles.categoryItemName}>
                                                {section.name}
                                            </Text>
                                            <Text style={styles.categoryItemWorkQuantity}>
                                                ({section.totalDoneTask}/{section.totalTaskQuantity})
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </Swipeable>
                        )
                    })
                }
                </ScrollView>

                <SpeedDialAddList 
                    addListModalState={addListModalState} 
                    setAddListModalState={setAddListModalState}
                    addListSpeedDail={addListSpeedDail}
                    setAddListSpeedDail={setAddListSpeedDail}
                />

                {/* modal add list*/}
                <Modal
                    animationType="slide"
                    visible={addListModalState}
                    >
                        <View>
                            <AddListModal 
                                closeModal={() => 
                                    { 
                                        toggleModalState()
                                        toggleSpeedDial()
                                    }
                                }
                                addList={createList}
                            />
                        </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    home:{
        height: "90%",
        marginVertical: 10,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    content:{
        height: "100%"
    },
    button: {
        alignItems: "center",
        padding: 10
    },
    categoryItem: {
        backgroundColor: "#fff",
        width: "46%",
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
        borderRadius: 10
    },
    categoryItemName:{
        fontSize: 18,
        fontWeight: "bold",
        color: colorsList.pink
    },
    categoryItemWorkQuantity:{
        fontSize: 14,
        color: "rgb(119,119,119)",
        marginTop: 5,
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
    },
    item:{
        display: 'flex',
        backgroundColor: "#fff",
        width: "46%",
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
        borderRadius: 10
    },
})

export default Home;