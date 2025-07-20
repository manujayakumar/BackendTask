import express,{Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import v1 from "./routes/v1";
import job from "./cron";

const app = express();

if(config.env === "production"){
    job.start(); 
}

app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({extended: true}))
    .use(express.json())
    .use(cors({
    origin: '*', // Allow all origins, you can specify specific origins if needed
    optionsSuccessStatus: 200, // For legacy browser support
}));

app.get("/health", (req: Request, res: Response)=>{
    res.status(200).json({
        ok: true,
    })
});

app.use("/v1", v1);

const server = app.listen(config.port, ()=>{
    console.log(`The port is successfully running on PORT:${config.port}`)
});
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down the server...');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});