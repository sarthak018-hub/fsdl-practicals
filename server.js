const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB (local)
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    branch: String
});

// Model
const Student = mongoose.model("Student", studentSchema);

// ➤ Add Student
app.post("/add", async (req, res) => {
    const { name, rollNo, branch } = req.body;

    const student = new Student({ name, rollNo, branch });
    await student.save();

    res.send("Student Added Successfully");
});

// ➤ Get All Students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// ➤ Search by Roll No
app.get("/student/:rollNo", async (req, res) => {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    
    if (student)
        res.json(student);
    else
        res.send("Student Not Found");
});

// ➤ Delete Student
app.delete("/delete/:rollNo", async (req, res) => {
    await Student.deleteOne({ rollNo: req.params.rollNo });
    res.send("Student Deleted");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});