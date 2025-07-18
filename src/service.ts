import express,{Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import v1 from "./routes/v1";

const app = express();

app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({extended: true}))
    .use(express.json())
    .use(cors());

app.get("/health", (req: Request, res: Response)=>{
    res.status(200).json({
        ok: true,
    })
});

app.use("/v1", v1);

app.listen(config.port, ()=>{
    console.log(`The port is successfully running on PORT:${config.port}`)
});
