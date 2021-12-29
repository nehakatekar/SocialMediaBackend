const mongooose = require('mongoose');

const signUpTemplate = new mongooose.Schema({
    name:{
        type: String,
        required: true,
        min:3,
        max:20
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        min :6
    },
    cpassword:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    // tokens:{
    //     token:{
    //         type:String,
    //         required: true
    //     }
    // }

})

// signUpTemplate.methods.generateAuthToken =async function(){
//     try{
// let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
// this.tokens=this.token.concat({token:token});
// await this.save();
// return token;
//     }catch(err){
// console.log(err)
//     }
// }
module.exports = mongooose.model('users', signUpTemplate);
