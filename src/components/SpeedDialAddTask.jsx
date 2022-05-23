import React , { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpeedDial } from 'react-native-elements';

import colorsList from '../utils/Colors'

export default function SpeedDialAddTask(
    {
      addTaskModalState,
      setAddTaskModalState,
      addTaskSpeedDail,
      setAddTaskSpeedDail,
    }
  ) {

  return (
    <>
      {/* actions button */}
        <SpeedDial
          isOpen={addTaskSpeedDail}
          icon={{ name: 'edit', color: colorsList.white }}
          openIcon={{ name: 'close', color: colorsList.white }}
          onOpen={() => setAddTaskSpeedDail(!addTaskSpeedDail)}
          onClose={() => setAddTaskSpeedDail(!addTaskSpeedDail)}
          style={{paddingBottom: 15,paddingRight: 10}}
        >
          <SpeedDial.Action
            icon={{ name: 'add', color: colorsList.white }}
            title="Add new task"
            onPress={() => setAddTaskModalState(!addTaskModalState)}
          />
        </SpeedDial>
    </>
  )
}

const styles = StyleSheet.create({})