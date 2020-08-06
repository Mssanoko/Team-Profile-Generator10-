// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer {
    constructor(name, role, id, email, github){
        this.name=name;
        this.role=role;
        this.id=id;
        this.email=email;
        this.gibhub=github;
    }
    getName(){
        return this.name
    }
    getRole(){
        return this.role
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getGithub(){
        return this.github
    }
}
module.exports = Engineer;