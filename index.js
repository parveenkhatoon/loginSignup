
const jwt = require('jsonwebtoken')
const fs = require('fs').promises;
const util = require('util');
const readFile = util.promisify(fs.readFile);
const readline = require('readline-sync')
const user = readline.question("What you want login or singup:")


async function loginSingUp() {
    if (user == "login") {
        var userName = readline.question("Enter your name:")
        var password = readline.question("Enter your password:")
        const mydata = await fs.readFile("userDetails.json",(err,data)=>{});
        var data = JSON.parse(mydata)
        var i=0;
        while(i<data.length){
            if(password == data[i]['Password'] && userName == data[i]['Name']) {
                const token = jwt.sign({Password:data[i].password,UserName:data[i].userName},"secrettoken",{expiresIn:"1y"})
                console.log("you have login successfully")
                console.log("This is your JWT token!!",token)
            }
            i++
        }
        console.log("sorry you don't have any account.do you want singup")
        const user1 = readline.question("Enter yes/no :")
        if (user1 == "yes") {
            var name = readline.question("Enter your name:")
            var lestname = readline.question("Enter your lest name:")
            var gender = readline.question("Enter your gender:")
            var password = readline.question("Enter your password:")
            var conformpassword = readline.question("conform your password:")
            var obj = { Name: name, Lestname: lestname, Gender: gender, Password: password, Conformpassword: conformpassword }
            var data = await fs.readFile('userDetails.json','utf-8',(err,data)=>{});
            var myObject = JSON.parse(data);
            myObject.push(obj);
            var newdata = JSON.stringify(myObject);
            fs.writeFile('userDetails.json', newdata, (err,data) => {
                if (err) throw err;
        });
        console.log("you have signup successfully!!");
        }
        else {
            console.log("thanku for using this application!!")
        }
    }
    else if (user == "singup") {
        var name = readline.question("Enter your name:")
        var lestname = readline.question("Enter your lest name:")
        var gender = readline.question("Enter your gender:")
        var password = readline.question("Enter your password:")
        var conformpassword = readline.question("conform your password:")
        var obj = { Name: name, Lestname: lestname, Gender: gender, Password: password, Conformpassword: conformpassword }
        var data1 = await fs.readFile('userDetails.json','utf-8',(err,data)=>{});
        var myObj = JSON.parse(data1);
        myObj.push(obj);
        var newdata = JSON.stringify(myObj);
        fs.writeFile("userDelails.json", newdata, (err) => {
            if (err) throw err;
        })
        console.log("you have singup successfully!!")
    }
  
}
loginSingUp()
