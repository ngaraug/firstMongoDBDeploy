import express from "express";
import bodyParser from "body-parser";
import ejs from 'ejs';

// ********newly added***********

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var importPath = __dirname + "/day";

importPath = importPath.toString()


// // console.log(importPath)

// import dayOfWeek from  __dirname + "/day";

// ********newly added***********


import {dayOfWeek, sayHello} from "./day.js";        //*sorted*

// ****************DB connection section (start)****************
import mongoose from "mongoose";
import _ from "lodash";

const dbName = 'todoDB'
// const uri = 'mongodb://0.0.0.0:27017/' + dbName
const uri = 'mongodb+srv://ngaraug:GauMongoDB15@cluster0.drr9nzg.mongodb.net/' + dbName

mongoose.connect(uri).then(()=>{
    console.log(`Connection to ${dbName} successful`)
})

const taskSchema = new mongoose.Schema({
    taskName: String,
    isItDone: Boolean
})

const Task = mongoose.model('Task', taskSchema)
// ****************DB connection section (end)****************


const app  = express();

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static("public"))

// var tasks = [];              //From V1.0

app.get("/", (req, res)=>{     
    
    // var date = new Date();
    
    // var today  = date.toLocaleString("en-US", {day: "numeric" ,weekday: "long", month: "long", year: "numeric" })
    var today = dayOfWeek()
    
    let tasks = []
    Task.find({}).then((doc)=>{                             //Reading the DB for the tasks
        tasks = doc 
        // console.log(tasks)
        res.render('list', {weekDay : today, tasks: tasks}) //Rendering the found tasks
    })  
})


app.post("/", (req, res)=>{                             //Adding a task
    var nameOfTask = req.body.newListItem;

    let task = new Task({       //Creating task
        taskName: nameOfTask
    })

    task.save().then(()=>console.log("Task added"))     //Inserting task to the DB
    // tasks.push(task)         //From V1.0
    res.redirect("/")
})
 
//Deleting a task
app.post('/delete', (req, res)=>{
    const itemId = req.body.listItem
    Task.findByIdAndDelete(itemId).then(()=>{
        console.log("Item deleted")
        res.redirect('/')
    })
})

//Making custom lists
app.get('/:customListName', (req, res)=>{
    console.log(req.params.customListName)
})

app.listen(3000, ()=>console.log("Listening on port 3000"))