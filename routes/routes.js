
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const signUpTemplateCopy = require('../models/signUpModels')

router.post('/signup', async (request, response) => {
    try {
        const saltPassword = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(request.body.password, saltPassword)

        const signedUpUser = new signUpTemplateCopy({
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            work: request.body.work,
            password: securePassword,
            cpassword: request.body.cpassword
        })
        const user = await signedUpUser.save();
        response.status(200).json(user)
        // signedUpUser.save().then(data => {
        //     response.json(data)
        // })
    }
    catch (error) {
        response.json(error)
    }
})
router.post("/login", (req, res) => {

    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty Field"
        })
    } else {
        signUpTemplateCopy.find({ email })
            .then(data => {
                if (data.length) {
                    const securePassword = data[0].password;
                    bcrypt.compare(password, securePassword).then(result => {
                        if (result) {
                            res.json({
                                status: "SUCCESS",
                                message: "signin successful",
                                data: data
                            })
                        } else {
                            res.json({
                                status: "FAILED",
                                message: "Invalid Password"
                            })
                        }
                    })
                        .catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An Error Occured comparing password"
                            })
                        })
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid Credentials"
                    })
                }
            })
            .catch(err=>{
                res.json({
                    status: "FAILED",
                    message: "An Error occured Whhile checking exist user"
                })
            })
    }
})
//LOgin

// router.post("/login", async (req, res) => {

//     // try{
//     // const user =await signUpTemplateCopy.findOne({email:req.body.email});
//     // !user && res.status(404).json("user not found")

//     // const validPassword = await bcrypt.compare(req.body.password, user.password)
//     // !validPassword && res.status(400).json("Wrong password")

//     // res.status(200).json(user)
//     // }catch(err){
//     //     res.status(500).json(err)
//     // }
//     const { email, password } = req.body
//     signUpTemplateCopy.findOne({ email: email }, (err, user) => {
//         if (user) {
//             if (password === user.password) {
//                 res.send({ message: "Login successfull", user: user })
//             }
//             else{
//                 res.send({ message: "Password not match", user: user })
//             }
//         } else {
//             res.send("User Not registered")
//         }
//     })
// })


// router.post('/register',async (req,res)=>{
// // console.log(req.body)
// //     res.json({message: req.body})
//     const{ name, email, phone, work, password, cpassword } = req.body;

//     // console.log(name);
//     if(!name || !email || !phone ||  !work || !password || !cpassword ){
//         return res.status(422).json({ error: "Please Filled the field properly"});
//     }

//     try{
//        const userExist = await User.findOne({email: email});
//        if(userExist){
//         return res.status(422).json({error: "Email already Exist"})
//     }

//     const user = new User({name, email, phone, work, password, cpassword});

//      const userRegister = await user.save();
//      if(userRegister){
//         res.status(201).json({message:"user registered succefully"})
//     }else{
//         res.status(500).json({error:"failed to registered"})
//     }

//     }catch(err){
//         console.log(err);
//     }

// })

// router.post('/signin', async (req, res) => {
//     try {
//         let token;
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: "Plz Filled the data" })
//         }

//         const userLogin = await User.findOne({ email: email });

//         if (userLogin) {
//             const isMatch = await bcrypt.compare(password, userLogin.password);
//             token = await userLogin.generateAuthToken();
//             console.log(token);

//             res.cookie("jwtoken", token, {
//                 expires: new Date(Date.now() + 25892000000),
//                 httpOnly: True
//             });
//             if (!isMatch) {
//                 res.status(400).json({ eroor: "Invalid" })
//             } else {
//                 res.json({ message: "successfully" });
//             }
//         } else {
//             res.status(400).json({ error: "Invalid" })
//         }
//     }
//     catch (err) {
//         console.log(err)
//     }
// })

module.exports = router;