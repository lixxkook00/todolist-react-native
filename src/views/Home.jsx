import React,{useState} from 'react';

import AddListModal from '../components/AddListModal'
import SpeedDialAddList from '../components/SpeedDialAddList'

import colorsList from '../utils/Colors'
import Header from '../components/Header'

import { 
        View,
        TouchableHighlight,
        StyleSheet,
        Text,
        Modal,
        ScrollView
    } 
from 'react-native';

const sectionList = [
    {
        id:0,
        name:"All",
        date:new Date(),
        done:2,
        totalWork:10,
    },
    {
        id:1,
        name:"Work",
        date:new Date(),
        done:22,
        totalWork:110,
    },
    {
        id:2,
        name:"Home",
        date:new Date(),
        done:2,
        totalWork:3,
    },
    {
        id:3,
        name:"Daily",
        date:new Date(),
        done:69,
        totalWork:100,
    },
    {
        id:4,
        name:"Other",
        date:new Date(),
        done:69,
        totalWork:100,
    }
]

function Home({navigation}) {

    // toggle modal listModalState
    const [addListModalState,setAddListModalState] = useState(false)

    // toggle speedail openSpeedDail
    const [addListSpeedDail,setAddListSpeedDail] = useState(false)

    // list section data
    const [list,setList] = useState(sectionList)

    const categoryItemHandler = (section) => {
        navigation.navigate('Detail',section)
    }

    const toggleModalState = () => {
        setAddListModalState(!addListModalState)
    }

    const toggleSpeedDial = () => {
        setAddListSpeedDail(!addListSpeedDail)
    }

    // handle add new list
    const addList = (nameList) => {
        // clone to temp list with spread
        let tempList = [...list]

        // create new list
        tempList.push({
            id:tempList.length,
            name:nameList,
            date:new Date(),
            done:10,
            totalWork:10,
        })

        // update new list
        setList(tempList)
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
                        return (
                            <TouchableHighlight 
                                style={styles.categoryItem}
                                underlayColor="#8C98CD" 
                                key={index}
                                onPress={() => categoryItemHandler(section)} 
                            >
                                <View style={styles.button}>
                                    <Text style={styles.categoryItemName}>
                                        {section.name}
                                    </Text>
                                    <Text style={styles.categoryItemWorkQuantity}>
                                        ({section.done}/{section.totalWork})
                                    </Text>
                                </View>
                            </TouchableHighlight>
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
                                addList={addList}
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
    }
})

export default Home;