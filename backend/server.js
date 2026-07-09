import app from "./src/app.js";
import { ConnectToDB } from "./src/config/db.js";


ConnectToDB();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});