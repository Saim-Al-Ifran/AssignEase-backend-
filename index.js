const app = require("./src/app");
const connectDB = require("./src/config/db");


app.listen(3000, async()=>{
    await connectDB()
    console.log("Server running on port 3000");
})