import React , { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpeedDial } from 'react-native-elements';

import colorsList from '../utils/Colors'

export default function SpeedDialAddList(
    {
      addListModalState,
      setAddListModalState,
      addListSpeedDail,
      setAddListSpeedDail
    }
  ) {

  return (
    <>
      {/* actions button */}
        <SpeedDial
          isOpen={addListSpeedDail}
          icon={{ name: 'edit', color: colorsList.white }}
          openIcon={{ name: 'close', color: colorsList.white }}
          onOpen={() => setAddListSpeedDail(!addListSpeedDail)}
          onClose={() => setAddListSpeedDail(!addListSpeedDail)}
          style={{paddingBottom: 15,paddingRight: 10}}
        >
          <SpeedDial.Action
            icon={{ name: 'add', color: colorsList.white }}
            title="Add new list"
            onPress={() => setAddListModalState(!addListModalState)}
          />
        </SpeedDial>
    </>
  )
}

const styles = StyleSheet.create({})