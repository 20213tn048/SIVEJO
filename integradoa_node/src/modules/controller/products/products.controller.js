const { Response, Router, response} = require('express');
const { validateError } = require('../../../utils/functions');
const {insert, findById,findAll, deleteId,updateById, updateImagePath} = require("./products.gateway")
const {uploadFiles, updateFiles, foundImage} = require("../../../utils/uploads");
<<<<<<< HEAD
const {auth, checkRoles} = require("../../../config/jwt");

=======
>>>>>>> e8d2a2b1a3ab931a31b80d75c81acc799f241171
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

const save = async (req, res = Response) => {
    try {
        const { description,category,price,stock} = req.body;
        console.log(req.body);
<<<<<<< HEAD
        const product = await insert({ description,category,price,stock,images:''});
=======
        const product = await insert({ descriptions,category,price,stock,images:''});
>>>>>>> e8d2a2b1a3ab931a31b80d75c81acc799f241171
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const getall = async (req,res = Response) =>{
    try {
        const results= await findAll();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message });
    }
};

const getbyid = async (req,res = Response) => {
    try {
        const {id} = req.params;
        console.log(req.params);
        if (Number.isNaN(id)) throw Error('Wrong type');
        const results = await findById(id);
        res.status(200).json(results);
    }catch (err){
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const update = async (req, res = Response) => {
    try {
<<<<<<< HEAD
        const { description,category,price,id,stock} = req.body;
        console.log(req.body);

        const product = await updateById({ description, category, price, stock, id});
=======
        const { descriptions,category,price,id,stock} = req.body;
        console.log(req.params);

        const product = await updateById({ descriptions, category, price, stock, id, path});
>>>>>>> e8d2a2b1a3ab931a31b80d75c81acc799f241171
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const deletebyid = async (req,res =Response) =>{
    try {
        const {id} = req.body;
        if (Number.isNaN(id)) throw Error('Wrong type');
        const results = await deleteId({id});
        res.status(200).json(results);
    }catch (err){
        const message = validateError(err);
        res.status(400).json({message});
    }
};

<<<<<<< HEAD

const uploadImage = async (req, res = Response) =>{
    try{
        const {idProduct} = req.params;
        console.log('El producto con imagen es',idProduct);
=======
const uploadImage = async (req, res = Response) =>{
    try{
        const {idProduct} = req.params;
>>>>>>> e8d2a2b1a3ab931a31b80d75c81acc799f241171
        if(req.files) {
            if (idProduct) {
                const results = await findById(idProduct);
                if(results[0].id == idProduct){
                    const {msg, path} = await uploadFiles(req.files, results[0].images);
                    console.log(msg);
                    const resultUpdate = await updateImagePath ({path,idProduct})
                    res.status(200).json(resultUpdate);
                }else
                res.status(400).json({msg:"Revisa tu solicitud"});
            }else console.log("no hay imagen path");
        }else console.log("no hay archivo");
    }catch (error){
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
}

const getImage = async (req, res = Response) =>{
    try {
        const {idProduct} = req.params;
<<<<<<< HEAD
        console.log('El producto con imagen es',idProduct);

=======
>>>>>>> e8d2a2b1a3ab931a31b80d75c81acc799f241171
        if (idProduct) {
            const results = await findById(idProduct);
            if (results[0].id == idProduct) {
                const {msg, uploadPath} = await foundImage(results[0].images);
                console.log(msg);
                if (!(uploadPath === '')){
                    return res.sendFile(uploadPath);
                }
            }
        }
        res.status(400).json({msg:"No se encontró la imagen"});
    }catch (error){
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
}

const productsRouter = Router();
productsRouter.post('/',[],save);
productsRouter.get('/',[auth],getall);
productsRouter.get('/:id',[],getbyid);
productsRouter.delete('/',[],deletebyid);
productsRouter.put('/',[],update);

const uploadRouter = Router();
<<<<<<< HEAD
uploadRouter.get('/',[], getImage);
uploadRouter.post('/:id', [], uploadImage);
=======
uploadRouter.get('/:idProduct',[], getImage);
uploadRouter.post('/:idProduct', [], uploadImage);
>>>>>>> e8d2a2b1a3ab931a31b80d75c81acc799f241171

module.exports = {
    productsRouter,
    uploadRouter
};