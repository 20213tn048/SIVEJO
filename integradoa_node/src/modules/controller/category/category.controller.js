const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {insert,findAll, findById,deleteId,updateById} = require("./category.gateway")

const save = async (req, res = Response) => {
    try {
        const { descriptions} = req.body;
        console.log(req.body);
        const category = await insert({ descriptions});
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const getAll = async (req,res = Response) =>{
    try {
        const results = await findAll();
        res.status(200).json(results);
    }catch (err){
        const  message = validateError(err);
        res.status(400).json({message});
    }
};
const getById = async (req,res = Response) =>{
    try {
        const {id} = req.params;
        console.log(req.params);
        const results = await findById(id);
        res.status(200).json(results);
    }catch (err){
        const  message = validateError(err);
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
        const { descriptions,id} = req.body;
        console.log(req.body);
        const category = await updateById({ descriptions,id});
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};
const categoryRouter = Router();
categoryRouter.post('/',[],save);
categoryRouter.get('/',[],getAll);
categoryRouter.get('/:id',[],getById);
categoryRouter.delete('/:id',[],deletebyid);
categoryRouter.put('/',[],update);

module.exports = {
    categoryRouter
};