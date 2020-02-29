const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
 day: {
   type: Date,
   default: Date.now()
 },
 exercises: [{
  type: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
  }, 
  weight: {
    type: Number,
    trim: true,
    required: "Enter Weight in pounds"
  },
  sets: {
    type: Number,
    trim: true,
  },
  reps: {
    type: Number,
    trim: true
  }, 
  duration: {
    type: Number,
    trim: true,
  },
  distance: {
    type: Number,
    trim: true
  } 
 }]
},
{
  toJSON: {
    vituals: true
  }
});

workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
      return total+exercise.duration
  }, 0)
});

const WorkoutModel = mongoose.model("Workout", workoutSchema);

module.exports = WorkoutModel;