import React, { useState } from 'react'
import { Text, View } from 'react-native'
import ScrollSelect from '../../components/ScrollSelect'
import { height, width } from '../../constants/layout'
import SegmentedControl from '@react-native-community/segmented-control'

interface TestProps {}

function Test(props: TestProps) {
  const [selected, setSelected] = useState<number | undefined>(0)
  return (
    <View>
      <SegmentedControl
        values={['One', 'Two']}
        selectedIndex={selected}
        onChange={event => {
          setSelected(event.nativeEvent.selectedSegmentIndex)
        }}
      />
      <Text>{selected}</Text>
    </View>
  )
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        padding: 16,
        backgroundColor: 'grey',
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: width / 2 - 1,
          width: 1,
          height,
          backgroundColor: 'blue',
          zIndex: 2,
          // opacity: 0,
        }}
      />
      <ScrollSelect
        unitType="coffeeWeightUnit"
        min={10}
        max={20}
        defaultValue={15}
        onChange={value => {}}
        step={1}
      />
    </View>
  )
}

export default Test
