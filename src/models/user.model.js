import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
            trim:true,
            lowercase:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
        },

        fullname:{
            type:String,
            required:true,
            index:true,
            trim:true,
        },

        avatar:{
            type:String, //cloudinary url
            required:true
        },

        coverImage:{
            type:String, //cloudinary url
        },

        watchHistory:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Video"
            }
        ],

        password:{
            type:String,
            required:true
        },

        refreshToken:{
            type:String
        }

    },{timestamps:true})


    userSchema.pre("save",async function (next) {
        if(!this.isModified("password"))
            return next();

        this.password = bcrypt.hash(this.password,10)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function (password) {
       return await bcrypt.compare(password,this.password)
    }

    userSchema.methods.generateAccessToken=function(){

        return 
         jwt.sign(
            {
            _id:this._id,
            email:this.email,
            username: this.username,
            fullname:this.fullname
        },
        process.env.GENERATE_ACCESS_TOKEN,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
        
    )
    }

    userSchema.methods.generateRefreshToken=function(){
        return 
        jwt.sign(
           {
           _id:this._id,
           
       },
       process.env.GENERATE_REFRESH_TOKEN,
       {
           expiresIn:process.env.ACCESS_REFERSH_EXPIRY
       }
    )
    }



export const User = mongoose.model("User",userSchema)