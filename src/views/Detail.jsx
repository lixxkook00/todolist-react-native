import { StyleSheet, Text, View,TouchableHighlight } from 'react-native'
import React from 'react'

const sectionItem = [
    {
        idList:0,
        content:"It seems that <TouchableHighlight> must have exactly one child.",
        date:new Date(),
    },
    {
        idList:1,
        content:"WoThe docs say that it supports only one child and more than one must be wrapped in a <View>, but not that it must have at least (and most) one child. rk",
        date:new Date(),
    },
    {
        idList:2,
        content:"I just wanted to have a plain coloured button with no text/image, so I didn't deem it necessary to add a child.",
        date:new Date(),
    },
    {
        idList:3,
        content:"I'll try to update the docs to indicate this.",
        date:new Date(),
    }
]

export default function Detail({navigation}) {
    const goBackHandler = () => {
        navigation.goBack();
    }
  return (
    <View>
      <Text>ID:</Text>
      <TouchableHighlight onPress={goBackHandler}>
          <View>
            <Text>{navigation.getParam('id')}</Text>
            <Text>{navigation.getParam('name')}</Text>
            {/* <Text>{navigation.getParam('date')}</Text> */}
          </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({})