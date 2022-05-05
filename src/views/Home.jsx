import React,{useState} from 'react';
import { View,TouchableHighlight,StyleSheet ,Text,Modal,ScrollView} from 'react-native';

import AddListModal from '../components/AddListModal'
import SpeedDialAddList from '../components/SpeedDialAddList'

import colorsList from '../utils/Colors'

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

    // toggle modal
    const [listModalState,setListModalState] = useState(false)

    // toggle speedail
    const [openSpeedDail,setOpenSpeedDail] = useState(false)

    // list section
    const [list,setList] = useState(sectionList)

    const categoryItemHandler = (section) => {
        navigation.navigate('Detail',section)
    }

    const toggleModalState = () => {
        setListModalState(!listModalState)
    }

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
                        <AddListModal 
                            closeModal={() => 
                               { toggleModalState()
                                setOpenSpeedDail(!openSpeedDail)}
                            }
                            addList={addList}
                        />
                    </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    home:{
        height: "100%",
        marginVertical: 10,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    // scrollView:{
    //     display: "flex",
    //     justifyContent: "flex-start",
    // },
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