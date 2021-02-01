module.exports = (app) => {
    var stud = require('../controller/studcontroller.js');

    // Create a new student
    //app.post('/stud', stud.create);
    //submitStud
    app.post('/submitStud', stud.create);
    // Retrieve all student
    app.get('/showstuds', stud.findAll);

    // Retrieve a single student with rno
    app.get('/stud/:rno', stud.findOne);
    
    // Update a stud with rno
    app.put('/stud/:id', stud.update);

    // Delete a stud with rno
    app.delete('/deletestud/:rno', stud.delete);
  
}