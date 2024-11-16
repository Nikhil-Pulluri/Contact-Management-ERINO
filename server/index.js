const express = require("express")
const app =express()
const port = 4000;
const mongoose = require("mongoose")
// const jwt = require("jsonwebtoken")
const path = require("path")
const cors = require("cors")


app.use(express.json());
app.use(cors());

const  Contacts = mongoose.model("contacts",{
      firstname:{
        type:String,
        required:true
      },
      lastname:{
        type:String,
        required:true
      },
      email:{
         type:String,
         required:true,
         unique:true,
      },
      phone:{
        type:String,
        required:true,
        unique:true,
      },
      company:{
        type:String,
        required:true,
      },
      jobtitle:{
        type:String,
        required:true,
      },
})
mongoose.connect("mongodb+srv://nikhilpulluri7810:1234@nikhilpulluri.g6f9o.mongodb.net/contact_management_system?retryWrites=true&w=majority&appName=NikhilPulluri")


app.post("/addcontact",async (req,res)=>{
    let check = await Contacts.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success:false,error:"Existing User Found with same email address"})
    }
   const contact = new Contacts({
      firstname:req.body.fname,
      lastname:req.body.lname,
      email:req.body.email,
      phone:req.body.phnum,
      company:req.body.company,
      jobtitle:req.body.job_title,
   })
   await contact.save();
   res.json({success:true, msg:"added succesfully", id: contact._id });
})
app.get("/contacts",async (req,res)=>{
    const contacts = await Contacts.find({});
    console.log(contacts);
    res.json({success:true,contacts,msg:"Retrieved Succesfully"});
})


app.put("/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const firstname = req.body.fname;
        const lastname = req.body.lname;
        const email = req.body.email;
        const phone = req.body.phnum;
        const company = req.body.company;
        const jobtitle=req.body.job_title;
        const updatedContact = await Contacts.findOneAndUpdate(
            { _id: id },
            { 
                $set: { firstname, lastname, email, phone, company, jobtitle } 
            },
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the contact" });
    }
});
app.delete("/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contacts.findOneAndDelete({ _id: id });
        if (!deletedContact) {
            return res.status(404).json({ success: false, msg: "Contact not found" });
        }

        res.status(200).json({ success: true, msg: "Deleted successfully", contact: deletedContact });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ success: false, msg: "An error occurred while deleting the contact" });
    }
});


app.listen(port,(error)=>{
    if(!error)
    {
      console.log("server running on port "+port);
    }
    else
    {
     console.log("Error : "+error);
    }
 })
