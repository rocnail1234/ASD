import express from "express"
import cors from "cors"
import mainRouter from "./presentation/route"




   const app = express()
   const PORT = process.env.PORT || 8000
   const allowedOrigins = [ 'http://localhost:5173', 'https://ninedream.netlify.app/' ]; 
   app.use(cors({
      origin: function (origin, callback) {
        // Permitir solicitudes sin un origen (por ejemplo, CURL en terminal)
        if (!origin) return callback(null, true);
    
        // Revisar si el origen está en la lista permitida
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
    
        return callback(null, true);
      }
    }));
    
   
   app.use(express.json())

  
  app.use("/",mainRouter)


  app.listen(PORT, () => {
  console.log("server running")})



