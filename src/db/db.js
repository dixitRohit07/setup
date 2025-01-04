import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config({
    path:'./.env'

})

const connection = async()=>{
    try {
        await mongoose.connect(process.env.URL);
        console.log("Connection Succesfull");
        
    } catch (error) {
        console.log("Connection Error",error);
        
    }
}

export default connection




// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// // Load environment variables from env file
// dotenv.config({ path: './.env' });

// const connection = async () => {
//     try {
//         // Debug the loaded URL
//         console.log('MongoDB URI:', process.env.URL);

//         await mongoose.connect(process.env.URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connection Successful");
//     } catch (error) {
//         console.error("Connection Error", error.message);
//     }
// };

// export default connection;
