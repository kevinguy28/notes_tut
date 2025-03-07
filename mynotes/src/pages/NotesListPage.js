import React, {useEffect, useState} from 'react'
// import notes from '../assets/Data'
import AddButton from '../components/AddButton'
import ListItem from '../components/ListItem'

const NotesListPage = () => {
  let [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  },[])

let getNotes = async () => {
  let response = await fetch('http://localhost:8000/notes')
  let data = await response.json()
  setNotes(data)
}

console.log(notes)

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
        {notes.map((note, index) => (
            <ListItem key={index} note={note}/>
        ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage
