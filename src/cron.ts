import {CronJob} from "cron";
import https from "https";

const job = new CronJob("*/14 * * * *", function(){
    const apiUrl = process.env.API_URL;
  
  if (!apiUrl) {
    console.error("API_URL is not defined in environment variables.");
    return;
  }
    https.get(apiUrl, (res) => {
        if(res.statusCode === 200){
            console.log("GET request sent successsfully");
        }else{
            console.log("GET request failed", res.statusCode);
        }
    }).on("error", (e) => console.error("Error while sending request", e));
});

export default job;