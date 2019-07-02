import React from 'react'
import Card from '../../../../components/Card'
import Instructions from '../../../../components/Instructions'

interface NotesProps {
  text: string
}

function Notes({ text }: NotesProps) {
  return (
    <Card>
      <Instructions text={'Your notes from last time:'} hint={text.trim()} />
    </Card>
  )
}

export default Notes
