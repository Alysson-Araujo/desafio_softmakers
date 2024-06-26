import express,{Request, Response, NextFunction} from "express";
import "express-async-errors";
import cors from "cors"
import dotenv from "dotenv";
import router from "./routes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error:err.message
        })
    }

    return res.status(500).json({
        status:"error",
        menssage:"Internal server error."
    })
})

app.listen(process.env.PORT_SERVER || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT_SERVER || 3000}`)
});