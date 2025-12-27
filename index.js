import mongoose from "mongoose";
import express from "express";
// import Todo from "./models/Todo-schema.js";
import Employee from "./models/employee-generator-schema.js";


const app = express();

// Set view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
// let a = await mongoose.connect("mongodb://localhost:27017/mydatabase");

// app.get("/", (req, res) => {
//   const data = new Todo({
//     title: "Sample Todo",
//     name: "John Doe",
//     email: "ahmad@mohammad.com",
//   });

//   data.save();

//   res.send("Mongoose and Express are set up correctly!\n");
// });

// app.get('/test', async (req, res) => {
//     const todo = await Todo.findOne({ });
//     res.json({title: todo.title, name: todo.name, email: todo.email});
// });




// MY RANDOM GENERATOR CODE HERE

const connectDB = await mongoose.connect("mongodb://localhost:27017/companyDB");

let Random_names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis'];
let Random_languages = ['JavaScript', 'Python', 'Java', 'C#', 'Ruby'];
let Random_cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

// app.use(express.static('public'));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// app.use((req, res, next) => {
//     res.sendFile('index.html', { root: '__dirpath' }, (err)=>{
//         if (err) {
//             console.error('Error sending file', err);
//             res.status(500).send('Error\n');
//         }});
//     // next();
// });



app.post('/add-employee', async (req, res)=>{
    try {
        const employees = [];
        const savePromises = [];


        const privious_db_delete = await Employee.deleteMany({});


        for (let i = 0; i < 10; i++) {
            let Random_name = Math.floor(Math.random() * Random_names.length);
            let Random_language = Math.floor(Math.random() * Random_languages.length);
            let Random_city = Math.floor(Math.random() * Random_cities.length);
            let Random_salary = Math.floor(Math.random() * 100000) + 30000; 
            let isManage = Math.random() < 0.5 ? false : true;

            const employee = new Employee({
                name: Random_names[Random_name],
                salary: Random_salary,
                language: Random_languages[Random_language],
                city: Random_cities[Random_city],
                isManager: isManage,
            });

            employees.push(employee);
            savePromises.push(employee.save());
        }

        await Promise.all(savePromises);
        res.json({ message: '10 employees added successfully!', employees });
    } catch (err) {
        res.status(500).json({ error: 'Error adding employees' });
    }
});