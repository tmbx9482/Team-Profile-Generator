// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// call the methods of the parent class 
class Intern extends Employee {
    constructor(name, id, email, school, perseverance) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getPerseverance() {
        return this.perseverance;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;
