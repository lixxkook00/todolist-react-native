import React , { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpeedDial } from 'react-native-elements';

import colorsList from '../utils/Colors'

export default function SpeedDialAddList({listModalState,setListModalState,openSpeedDail,setOpenSpeedDail}) {

  return (
    <>
      {/* actions button */}
        <SpeedDial
          isOpen={openSpeedDail}
          icon={{ name: 'edit', color: colorsList.white }}
          openIcon={{ name: 'close', color: colorsList.white }}
          onOpen={() => setOpenSpeedDail(!openSpeedDail)}
          onClose={() => setOpenSpeedDail(!openSpeedDail)}
          style={{paddingBottom: 15,paddingRight: 10}}
        >
          <SpeedDial.Action
            icon={{ name: 'add', color: colorsList.white }}
            title="Add new list"
            onPress={() => setListModalState(!listModalState)}
          />
        </SpeedDial>
    </>
  )
}

const styles = StyleSheet.create({})