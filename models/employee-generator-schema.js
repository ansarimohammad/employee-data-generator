import mongoose from 'mongoose';

const EmployeeGeneratorSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean,
    generatedAt: { type: Date, default: Date.now }
});


const Employee = mongoose.model('Employee', EmployeeGeneratorSchema);
export default Employee;