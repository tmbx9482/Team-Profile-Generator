// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// call the methods of the parent class 
class Manager extends Employee {
    constructor(name, id, email, officeNumber, managed) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.managed = managed;

    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    Managed() {
        return this.manage;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;