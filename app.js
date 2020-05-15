const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express()



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");

})

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;

    const data = {
        members: [{
            email_address: emailAddress,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }

        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/5756332b93";

    const options = {
        method: "POST",
        auth: "derrick:"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));

        })
    })



    request.write(jsonData)
    request.end();

});





app.post("/failure", function(req, res) {
    res.redirect("/");
});




app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listening on port 3000")
})



// List ID
// 5756332b93
