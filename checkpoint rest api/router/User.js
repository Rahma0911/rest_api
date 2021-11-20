const express = require("express");
const User = require("../models/User");
const router = express.Router();

//ADD A NEW USER TO THE DATABASE
router.post("/", async (req, res) => {
    try {
        //check for the email in the Database
        const findEmail = await User.findOne({email: req.body.email});
        if (findEmail) {
            return res.status(400).send({msg: "email should be unique"});
        }
        //create new user if the email is not found
        const user = new User(req.body);
        await user.save();
        res.status(200).send({msg: "signup successfully", user});
    } catch (error) {
        //if there is error
        res.status(200).send({msg: "can not register the user", error});
    }
});

//RETURN ALL USERS
router.get("/", async (req, res) => {
    try {
        //Find all the users
        const findUser = await User.find();
        res.status(200).send({msg: "Getting users successfully", findUser});
    } catch (error) {
        res.status(400).send({msg: "Can not get users", error});
    }
});

//EDIT A USER BY ID 
router.put("/:id", async (req, res) => {
    try {
        //find a user by his id and edit it
        const f = await User.findOneAndUpdate({_id: req.params.id}, 
            {$set: { "name":req.body.name, "email":req.body.email, "password":req.body.password }});
        res.status(200).send({msg: "Updated successfully", f});
    } catch (error) {
        res.status(400).send({msg: "Can not modify user", error});
    }
});

//REMOVE A USER BY ID
router.delete("/:id", async (req, res) => {
    try {
        //Delete one user by his id
        const f = await User.findByIdAndRemove({_id: req.params.id});
        res.status(200).send({msg: "Deleted successfully", f});
    } catch (error) {
        res.status(400).send({msg: "Can not delete user", error});
    }
});

module.exports = router;