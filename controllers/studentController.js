import student from '../models/student.js'; // Import the student model

export function getStudent(req, res) {
    // Fetch the list of students from the database

student.find().then(
        (studentList)=>{
            (
                res.json({
                    list: studentList,
                })
            )
        }
              // Respond with the list of students
    )

}


export function createStudent(req, res)  {
    
    const newStudent = new student(req.body); // Create a new student instance from the request body
    newStudent.save()
      .then(() => {
        res.json({
          message: 'Student created successfully',
         });
      })
      .catch((error) => {
        res.json({
          message: 'Error creating student',
         });
      });
    }

    export function deleteStudent(req, res) {
       student.deleteOne({name: req.body.name}).then(() => {
        res.json({
          message: 'Student deleted successfully',
        });

    })
         }