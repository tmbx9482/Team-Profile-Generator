// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// call the methods of the parent class 
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }


    // execute the code
    //return value is "returned" back to the "caller"
    getGithub() {
        return this.github;
    }


    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;