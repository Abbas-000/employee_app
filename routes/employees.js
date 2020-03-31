const Employee = require('../models/employee');
const ObjectId = require('mongodb').ObjectId;


module.exports = (app) => {
  app.post('/add', (req, res) => {
    let newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    newEmployee.position = req.body.position;
    newEmployee.gender = req.body.gender;
    newEmployee.age = req.body.age;
    newEmployee.save(e => {
      if (e) throw e;
      console.log('saved successfully');
      res.redirect("dashboard");
    });
  });

  app.put('/edit', (req, res) => {
    let { name, email, age, gender, position } = req.body;
    let id = req.body.emid;
    let updated = {name: name, email: email, age: age, gender: gender, position: position};
    Employee.findOneAndUpdate({_id: ObjectId(id)}, updated, (e, doc) => {
      if (e) {
        throw e;
      }
      console.log('successfully updated');
      res.redirect('dashboard');
    });
  });

  app.delete('/delete', (req, res) => {
    let id = req.body.emid;
    Employee.findOneAndDelete({_id: ObjectId(id)}, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("deleted successfully");
      res.redirect("dashboard");
    });
  });

  app.get('/dashboard', (req, res) => {
    Employee.find({}, (err, doc) => {
      if (err) {
        throw err;
      }
      res.render('dashboard', {data: doc});
    })
  });

}
