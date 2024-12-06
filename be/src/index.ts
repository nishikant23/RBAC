import express  from "express";
import cookieParser from "cookie-parser";
import { catchError, returnError } from "./middlewares/errorHandlingMiddleware"
import cors from "cors"
import morgan from "morgan";
import { mainRouter } from "./routes/index";
const app = express();

app.use(cors({origin: "http://localhost:5173", credentials : true}))
   .use(express.json())
   .use(cookieParser())
   .use(morgan("dev"))
   .use('/api/v1', mainRouter)
   .use(catchError)
   .use(returnError)

app.listen(3000);
