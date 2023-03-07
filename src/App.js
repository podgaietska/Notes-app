import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import uuid from "react-uuid";
import NoteEditor from './components/NoteEditor';
import NotePreview from './components/NotePreview';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNote, setActiveNote] = useState(false);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote){
        return updatedNote;
      }
      return note;
    })
    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    const answer = window.confirm("Are you sure?");
    if (answer){
      setNotes(notes.filter((note) => note.id !== idToDelete));
    }
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header openSidebar={toggleSidebar}/>
        <Sidebar formatDate={formatDate} sidebar={sidebar} notes={notes} onAddNote={onAddNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/notes/:id" element={<NotePreview formatDate={formatDate} activeNote={getActiveNote()} onDeleteNote={onDeleteNote}/>}/>
          <Route path="/notes/:id/edit" element={<NoteEditor sidebar={sidebar} activeNote={getActiveNote()} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;