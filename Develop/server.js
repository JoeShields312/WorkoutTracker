const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
// const seed = require("./seeders/seed")

const app = express();

const PORT = process.env.PORT || 3022;

const WorkoutModel = require('./models/workout.js')

const db = require('./models');
console.log(WorkoutModel)

// mongodb://localhost:27017/admin?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false
mongoose.connect("mongodb://localhost/WorkoutTracker", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

// html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'))
});

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/exercise.html'))
})

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/stats.html'))
})

app.post('/api/workouts', async (req, res) => {
  const working = db.Workout
  const work = new working({ })
  console.log(work)
  console.log(working)
  working.create(work)
  .then(dbWorkoutModel => {
    res.json(dbWorkoutModel)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

app.put("/api/workouts/:id", (req, res) => {
  WorkoutModel.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}}).then(
    function (err) {
    if (err) return next(err);
    res.send('Workout udpated.');
})
.then(dbWorkout => {
  res.json(dbWorkout)
})
.catch(err => {
  res.status(400).json(err)
})
})

//Getting all workouts 
app.get("/api/workouts", (req, res) => {
  WorkoutModel.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Getting the most recent 7 workouts
app.get("/api/workouts", (req, res) => {
  WorkoutModel.find().sort({ day: -1 }).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.delete("/delete/:id", (req, res) => {
  WorkoutModel.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.listen(PORT, function() {
    console.log(`Now listening on port: ${PORT}`);
  });


