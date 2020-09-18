// Include FileSystem
const fileSystem = require('fs')

// Include yargs
const yargs = require('yargs')

// Include chalk
const chalk = require('chalk')

// Include notes
const notes = require('./notes')



// Customize yargs version
yargs.version('1.1.0')

// Add Command using yargs
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        content: {
            describe: 'Note Content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.green.bold(`Adding a new note with title: ${ argv.title } and content: ${ argv.content }`))
        notes.addNote(argv.title, argv.content)
    }
})

// Remove Command using yargs
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.green.bold(`Removing a new note with title: ${ argv.title }`))
        notes.removeNote(argv.title)
    }
})

// Read Command using yargs
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.green.bold(`Reading a note with title: ${ argv.title }`))
        notes.readNote(argv.title)
    } 
})

// List Command using yargs
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        console.log(chalk.green.bold("List all notes"))
        notes.listAllNotes()
    }
})

yargs.parse()




