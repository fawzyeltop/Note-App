/*
 * This file called notes.js, handles all the operations that are related to notes
 * The first method is to add a new note
*/

// Include the file system module
const fileSystem = require('fs')

// Include the chalk for styling the console message
const chalk = require('chalk')

// The first method to add a new note
const addNote = async (title, content) => {
    try {
        const notes = await loadOldNotes()
        const duplicatedNote = notes.filter((note) => note.title === title)
        if(duplicatedNote.length === 0) {
            notes.push({ title: title, content: content })
            console.log(chalk.green.bold('A new note has been added successfully'))
            fileSystem.writeFileSync('notes.json', JSON.stringify(notes))
        } else console.log(chalk.yellow.bold('The note has been taken before'))
       
    } catch(err) {
        console.log(chalk.red.bold(err.message))
    }
}

// The second method to remove a note
const removeNote = async (title) => {
    let notes = await loadOldNotes()
    const foundedNote = notes.filter((note) => note.title === title)
    if(foundedNote.length === 0) console.log(chalk.yellow.bold('There is no note to be removed'))
    else {
        notes = notes.filter((note) => note.title !== title)
        console.log(chalk.green.bold(`The note with title ${ title } has been removed successfully`))
        fileSystem.writeFileSync('notes.json', JSON.stringify(notes))
    }
}

// The third method to read a note
const readNote = async (title) => {
    let notes = await loadOldNotes()
    const foundedNote = notes.filter((note) => note.title === title)
    if(foundedNote.length === 0) console.log(chalk.yellow.bold('There is no note to be read'))
    else console.log(foundedNote[0])
}

// The fourth method to list all notes 
const listAllNotes = async () => {
    const notes = await loadOldNotes()
    console.log(notes)
}

const loadOldNotes = async () => {
    try {
        const dataBuffer = fileSystem.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch(err) {
        return []
    }
}



// Export all methods that are related to notes
module.exports = { addNote, removeNote, readNote, listAllNotes }