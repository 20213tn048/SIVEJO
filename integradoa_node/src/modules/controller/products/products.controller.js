const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {insert, findById,findAll, deleteId,updateById} = require("./products.gateway")

const save = async (req, res = Response) => {
    try {
        const { descriptions,category,price,stock} = req.body;
        console.log(req.body);
        const product = await insert({ descriptions,category,price,stock });
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
        const { descriptions,category,price,id,stock} = req.body;
        console.log(req.body);
        const product = await updateById({ descriptions, category, price, stock, id});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};const productsRouter = Router();
productsRouter.post('/',[],save);
productsRouter.get('/',[],getall);
productsRouter.get('/:id',[],getbyid);
productsRouter.delete('/:id',[],deletebyid);
productsRouter.put('/',[],update);


module.exports = {
    productsRouter
};