var stud= require('../models/studmodel.js');

//Add Student
exports.create = (req, res) => {
    // Validate request
//res.send("recvd");   
//res.send(req.body.rno + ","+req.body.name); 
    if(!req.body.rno) {
        return res.status(400).send({
            message: "Student rno can not be empty"
        });
    }
    console.log(req.body.rno+","+req.body.name);
    // Create a Student
    var s1 = new stud({
        rno: req.body.rno ,
        name: req.body.name||"Guest", 
        course:req.body.course||"Node", 
        fees:req.body.fees|| 6000
    });

    // Save student in the database
    s1.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

//Show All Record
exports.findAll = (req, res) => {
    stud.find()
    .then(studs => {
       // res.render('index.ejs', { results: studs })
        res.send(studs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

//Search by _id
exports.findOne = (req, res) => {
    stud.findById(req.params.rno)
    .then(stud => {
        if(!stud) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.rno
            });            
        }
        res.send(stud);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.rno
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Student with id " + req.params.rno
        });
    });
};


// Update a student identified by the rno(_id) in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Student NAme cannot can not be empty"
        });
    }

    // Find a student identified by the rno(_id) in the request
    stud.findByIdAndUpdate(req.params.id, {
        
        rno: req.body.rno ,
        name: req.body.name|| "Guest", 
        course: req.body.course|| "Node", 
        fees: req.body.fees ||5000
    }, {new: true})
    .then(s1 => {
        if(!s1) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        res.send(s1);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Student with id " + req.params.id
        });
    });
};

//Delete Student by rno(_id)
exports.delete = (req, res) => {
    stud.findByIdAndRemove(req.params.rno)
    .then(stud => {
        if(!stud) {
            return res.status(404).send({
                message: "student not found with id " + req.params.rno
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.rno
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.rno
        });
    });
};