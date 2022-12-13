const {response, json} = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


const uploadFiles =(files,image) =>{
    return new Promise((resolve,reject)=>{
        if (!files || Object.keys(files).length === 0 || !files.File){
            return reject( {msg:"No se encontraron archivos",path:''});
        }


        //Remplazar
        if (image !== '') {
            try {
                const pathImage = path.join(__dirname, '../images/', image);
                if (fs.existsSync(pathImage)) {
                    fs.unlinkSync(pathImage);
                    console.log("Eliminación exitosa");

                }else return reject({msg: "Imagen no encontrada", path: ''});

            } catch (err) {
                return reject({msg: "Ocurrió un error al eliminar", path: ''});
            }
        }

        //Dividir nombre
        const {File} = files;
        const nombreCortado = File.name.split('.');
        const extencion = nombreCortado[nombreCortado.length-1];

        //Comprobar extenciones
        const extencionesValidas = ['jpg','png','jpeg','gif'];
        if (!extencionesValidas.includes(extencion)){
            return reject ({msg:`La extención ${extencion} no es válida`, path:''});
        }

        //Generar nuevo nombre
        const nuevoNombre = uuidv4() + '.' + extencion;
        const uploadPath = path.join(__dirname, '../images/', nuevoNombre);

        //Mover archivo
        File.mv(uploadPath, (err) => {
            if (err) {
                return reject( {msg:"Error de carga de archivo",path:''});
            }
            return resolve({msg: `File uploaded to ${nuevoNombre}`, path: nuevoNombre});
        })
    });
}

const foundImage = async (image) =>{

    return new Promise((resolve,reject)=> {
        const uploadPath = path.join(__dirname, '../images/', image);
        if (fs.existsSync(uploadPath)){
            return resolve ({uploadPath, msg:'imagen encontrada'});
        }else
            return reject ({uploadPath:'', msg:'imagen no encontrada'});
    });

}



module.exports = {
    uploadFiles,
    foundImage
}