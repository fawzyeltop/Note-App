/*
 * This file called notes.js, handles all the operations that are related to notes
 * The first method is to add a new note
 * The second method is to remove a note
 * The third method is to read a note
 * The fourth method is to list all notes
 */

// Include the file system module
const fileSystem = require("fs")

// Include the chalk for styling the console message
const chalk = require("chalk")

// The first method is to add a new note
const addNote = async (title, content) => {
    try {
        const notes = await loadOldNotes()
        const duplicatedNote = notes.find((note) => note.title === title)
        debugger // to make breakpoint for debugging
        if (!duplicatedNote) {
            notes.push({ title: title, content: content })
            fileSystem.writeFileSync("notes.json", JSON.stringify(notes))
            console.log(chalk.green.bold("A new note has been added successfully"))
        } else console.log(chalk.yellow.bold("The note has been taken before"))
    } catch (err) {
        console.log(chalk.red.bold(err.message))
    }
}

// The second method is to remove a note
const removeNote = async (title) => {
    try {
        let notes = await loadOldNotes()
        const note = notes.find((note) => note.title === title)
        if (!note)
            console.log(chalk.yellow.bold("There is no note to be removed"))
        else {
            notes = notes.filter((note) => note.title !== title)
            console.log(
                chalk.green.bold(
                    `The note with title ${title} has been removed successfully`
                )
            )
            fileSystem.writeFileSync("notes.json", JSON.stringify(notes))
        }
    } catch(err) {
        console.log(chalk.red.bold(err.message))
    }
   
}

// The third method is to read a note
const readNote = async (title) => {
    try {
        let notes = await loadOldNotes()
        const note = notes.find((note) => note.title === title)
        if (!note)
            console.log(chalk.yellow.bold("There is no note to be read"))
        else console.log(note)
    } catch(err) {
        console.log(chalk.red.bold(err.message))
    }
}

// The fourth method is to list all notes
const listAllNotes = async () => {
    try {
        const notes = await loadOldNotes()
        notes.forEach((note) => {
            console.log(chalk.green.bold(note.title))
        })
    } catch (err) {
        console.log(chalk.red.bold(err.message))
    }
}

const loadOldNotes = async () => {
    try {
        const dataBuffer = fileSystem.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (err) {
        return []
    }
}

// Export all the methods that are related to notes
module.exports = { addNote, removeNote, readNote, listAllNotes }
