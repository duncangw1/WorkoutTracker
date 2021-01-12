const db = require("../models");

module.exports = (app) => {
  // Route to get all workouts from database and calc total workout duration
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        dbWorkout.forEach((workout) => {
          let total = 0;
          workout.exercises.forEach((i) => {
            total += i.duration;
          });
          workout.totalDuration = total;
        });
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Route to find and update one workout in the database with new exercises and the new total workout duration
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body },
      },
      { new: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Route to create a new workout in the database
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Route to get all workouts within a certain range
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
