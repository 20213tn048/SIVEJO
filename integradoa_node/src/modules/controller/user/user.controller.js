const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const { save, findAll, deleteId, updateById,findById} = require('./user.gateway');
const {auth, checkRoles} = require("../../../config/jwt");

const getAll = async (req,res = Response) =>{
    try {
        const results= await findAll();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message });
    }
}
const getById = async (req,res = Response) =>{
    try {
        const {id} = req.params;
        const results= await findById(id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message });
    }
}
const insert = async (req, res = Response) => {
    try {
        const { name,surname,lastname,phone,address,email,password } = req.body;
        console.log(req.body);
        const user = await save({ name, surname, lastname, phone,address, email, password,role:'user', status: 1 });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};
const update = async (req, res = Response) => {
    try {
        const { name,surname,lastname,phone,address,email,password ,id} = req.body;
        console.log(req.body);
        const user = await updateById({ name, surname, lastname, phone,address, email, password, role:'user', status: 1, id });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const deleteById = async (req,res = Response) =>{
    try {
        const {id} = req.params;
        const results= await deleteId(id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message });
    }
};

const userRouter = Router();
userRouter.post('/', [], insert);
userRouter.get('/', [auth, checkRoles(['user'])], getAll); //GET -> !body
userRouter.get('/:id', [], getById);
userRouter.delete('/:id', [], deleteById);
userRouter.put('/', [], update);



module.exports = {
    userRouter,
};
