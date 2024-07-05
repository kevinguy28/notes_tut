import React, {useState, useEffect} from 'react'
import notes from '../assets/Data'
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const { id, history } = useParams();
    // let note = notes.find(note => note.id === Number(id))
    let [note, setNotes] = useState(null)

    useEffect(() => {
        getNote()
    },[id])


    let getNote = async () => {
        let response = await fetch(`http://localhost:8000/notes/${id}`)
        let data = await response.json()
        setNotes(data)
    }

    let updateNote = async () => {
        await fetch(`http://localhost:8000/notes/${id}`, {
            method: 'PUT',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let handleSubmit = () => {
        updateNote()
        history.push('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to = "/">
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
            </div>
            <textarea value={note?.body} onChange={(e) => {setNotes({...note, 'body': e.target.value})}}></textarea>
        </div>
  )
}

export default NotePage
