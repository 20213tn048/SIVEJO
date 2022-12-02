const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {insert,findAll, deleteId,updateById} = require("./request.gateway")

const save = async (req, res = Response) => {
    try {
        const {idUser, idProduct, idStatus} = req.body;
        console.log(req.body);
        const request = await insert({ idUser,idProduct,idStatus});
        res.status(200).json(request);
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


const deletebyid = async (req,res =Response) =>{
    try {
        const {id} = req.params;
        console.log(req.params);
        if (Number.isNaN(id)) throw Error('Wrong type');
        const results = await deleteId(id);
        res.status(200).json(results);
    }catch (err){
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const update = async (req, res = Response) => {
    try {
        const { name,category,price,id} = req.body;
        console.log(req.body);
        const product = await updateById({ name,category,price,id});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        const message = validateError(err);
        res.status(400).send({ message });
    }
};const requestsRouter = Router();
requestsRouter.post('/',[],save);
requestsRouter.get('/',[],getall);
requestsRouter.get('/:id',[],getbyid);
requestsRouter.delete('/:id',[],deletebyid);
requestsRouter.put('/',[],update);


module.exports = {
    requestsRouter
};