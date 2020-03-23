let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
require('./task-manager/src/db/mongoose')
const taskRouter = require('./task-manager/src/routers/task')
const userRouter = require('./task-manager/src/routers/user')
const Task = require('./task-manager/src/models/task')
const User = require('./task-manager/src/models/user')

app.use(cors());


   // resave => Forces the session to be saved back to the session store, even if the session was never modified 
   // saveUninitialized => the cookie will not be set on a response with an uninitialized session




// all of our routes will be prefixed with /api

// app.use((req, res, next) => {
//    if(req.method === 'GET'){
//       res.send('GET requests are disabled')
//    } else {
//       next()
//    }
// })
//Maintain server
// app.use((req, res, next) => {
//       res.status(503).send('Site is currently down. Please come back soon')

// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use('/api', bodyParser.json(), router);   





//[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
let jobs = [{'id':0,'position': 'Frontend developer','respon':'React Hooks + CSS','quantity': 2, 'salary': 25000},
   {'id':1,'position': 'Backend developer','respon':'Node','quantity': 2, 'salary': 25000},
   {'id':2,'position': 'Fullstack developer','respon':'Node','quantity': 2, 'salary': 40000}

];


router.route('/jobs').get((req, res) =>  res.json(jobs) );
app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80,  () => console.log("Server is running") );


const main = async () => {
   // const task = await Task.findById('5e7704356ab0dc31197525a7')
   // await task.populate('owner').execPopulate()
   // console.log(task.owner)
   const user = await User.findById('5e7704316ab0dc31197525a5')
   await user.populate('tasks').execPopulate()
   console.log(user.tasks)
}
main()