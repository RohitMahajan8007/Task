import app from "./src/app.js";
import { ConnectToDB } from "./src/config/db.js";


ConnectToDB();


app.listen(3000,()=>{
    console.log("Server is Running");
})