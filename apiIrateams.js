const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

let port = process.env.PORT || 3000;


const connection = mysql.createConnection(
    {
        host : "irateams.cjzbqozgh304.eu-west-3.rds.amazonaws.com",
        user : "admin",
        password : "Irateams2021",
        database : "IRATEAMS"
    });

connection.connect(function(error){
    if (error){
        console.log(error);
    }
    else {
        console.log('Conexión correcta');
    }
});

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.get("/usuarios", function(request, response)
{
    let id = request.query.id;
    let params =[id];
    let sql;
    if(request.query.id == null){
        sql = "SELECT * FROM IRATEAMS.usuario"
    }
    else {
        sql = "SELECT * FROM IRATEAMS.usuario WHERE id_usuario=?" 
    }

    connection.query(sql, params, function(err, result)
    {
        if(err){
            console.error(err);
            respuesta = {error:true,msg:"Error al conectar con la base de datos", resultado:err};
            response.status(500).send(respuesta);
        }
        else{
            if (result.length == 0) {
                respuesta = {error:false,msg:"Error al obtener usuario", resultado:result}
                response.status(404).send(respuesta);
            } else {
                respuesta = {error:false,msg:"Usuario", resultado:result}
                response.status(200).send(respuesta);
            }
        }
    });
});

// ENDPOINTS AQUÍ!!

app.listen(port)
