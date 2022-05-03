import React , { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpeedDial } from 'react-native-elements';

export default function SpeedDialAddList({listModalState,setListModalState,openSpeedDail,setOpenSpeedDail}) {

  return (
    <>
      {/* actions button */}
        <SpeedDial
          isOpen={openSpeedDail}
          icon={{ name: 'edit', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpenSpeedDail(!openSpeedDail)}
          onClose={() => setOpenSpeedDail(!openSpeedDail)}
        >
          <SpeedDial.Action
            icon={{ name: 'add', color: '#fff' }}
            title="Add new list"
            onPress={() => setListModalState(!listModalState)}
          />
        </SpeedDial>
    </>
  )
}

const styles = StyleSheet.create({})