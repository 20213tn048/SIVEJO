const { Response, Router, response} = require('express');
const { validateError } = require('../../../utils/functions');
const {insert, findById,findAll, deleteId,updateById, updateImagePath} = require("./products.gateway")
const {uploadFiles, updateFiles, foundImage} = require("../../../utils/uploads");
const {auth, checkRoles} = require("../../../config/jwt");

const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

const save = async (req, res = Response) => {
    try {
        const { description,category,price,stock} = req.body;
        console.log(req.body);
        const product = await insert({ description,category,price,stock,images:''});
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
        const { description,category,price,id,stock} = req.body;
        console.log(req.body);

        const product = await updateById({ description, category, price, stock, id});
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


const uploadImage = async (req, res = Response) =>{
    try{
        const {idProduct} = req.params;
        console.log('El producto con imagen es',idProduct);
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
        console.log('El producto con imagen es',idProduct);

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
uploadRouter.get('/',[], getImage);
uploadRouter.post('/:id', [], uploadImage);

module.exports = {
    productsRouter,
    uploadRouter
};