import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express from "express";
import bodyParser from 'body-parser';
import router from './routes'
import Authentication from './middlewares/authentication';


createConnection()
    .then(async connection => {

    const app = express();
    
    const port = process.env.PORT || 5000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api/*', Authentication.verifyToken);
    app.use('/api', router);

    app.use('*', (req, res) => {
        res.status(404).json({
          Message: 'URL DOES NOT EXIST, Please counter check'
        });
    });

    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });

})
    .catch(error => console.log("TypeORM connection error: ", error));
