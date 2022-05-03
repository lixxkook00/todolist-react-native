import React, { useState } from "react";
import { StyleSheet, Text, View,Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Navigator from "./src/routers/Routers";

// components
import Header from './src/components/Header.jsx';
// import AddListModal from './src/components/AddListModal.jsx'

export default function App() {

  // const [listModalState,setListModalState] = useState(false)

  return (
      <View style={styles.container}>

        <Header/>

        {/* main component */}
        <Navigator 
          style={styles.content}
          headerShown={false}
        />

        {/* background color */}
        <LinearGradient 
          colors={['#9EB4F1', '#C0AEF2']} 
          start={{
            x: 0,
            y: 0
          }}
          end={{
            x: 1,
            y: 1
          }}
          style={styles.box} 
        />

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundImage: "linear-gradient(180deg, #9EB4F1 10%, #C0AEF2 90%)"
  },
  box: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex:-1, // for iOS
    elevation: -1 // for Android
  },
  content:{
    // backgroundColor: 'rgba(52, 52, 52, 0.0)'
  }
});
