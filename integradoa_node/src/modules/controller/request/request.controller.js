const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {insert, findHistory, deleteId, updateById, findByStatus, findBySales} = require("./request.gateway")
const {auth,checkRoles} = require('../../../config/jwt');

const save = async (req, res = Response) => {
    try {
        let counts = 0;
        const {idUser, idProduct, idStatus} = req.body;
        if (!req.body.counts)
            counts = 1;
        else
            counts = req.body.counts;
        console.log({...req.body, counts});
        const request = await insert({ idUser,idProduct,idStatus, counts});
        res.status(200).json(request);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const getHistory = async (req,res = Response) =>{
    try {
        const {idUser} = req.params;
        if (Number.isNaN(idUser)) throw Error('Wrong type');
        const results= await findHistory(idUser);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message }); // Devuelve
        /*
        * description product
        * idCategory
        * price
        * Stock
        * IdStatus
        * Status
        * idSale
        */
    }
};

const getByStatus = async (req,res = Response) => {
    try {
        const {idStatus} = req.params;
        console.log(req.params);
        if (Number.isNaN(idStatus)) throw Error('Wrong type');
        const results = await findByStatus(idStatus);
        res.status(200).json(results);
    }catch (err){
        const message = validateError(err);
        res.status(400).json({message});
    }//Devuelve
    /*
    * idUser
    * Name user
    * idProduct
    * Description product
    * price
    * stock
    * idCategory
    * idSale
    * idStatus
    */
};

const getBySales = async (req, res = Response) =>{
    try {
        const {idSales} = req.params;
        if (Number.isNaN(idSales)) throw Error('Wrong type');
        const results = findBySales(idSales);
        return res.status(200).json(results);
    }catch (err){
        const message = validateError(err);
        res.status(400).json({message});
    }//Devuelve
    /*
    * idUser
    * idProduct
    * idStatus
    */
}

const updateStatus = async (req, res = Response) => {
    try {
        const {idSales, idStatus} = req.body;
        const results = await updateById({idSales, idStatus});
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({message});
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

const requestsRouter = Router();
requestsRouter.post('/',[],save);
requestsRouter.get('/:idSales',[auth, checkRoles(['admin'])],getBySales);//admin
requestsRouter.delete('/:id',[],deletebyid);
requestsRouter.put('/',[],updateStatus);

const statusRouter = Router();
statusRouter.get('/:idStatus',[auth],getByStatus);//admin


const historyRouter = Router ();
historyRouter.get('/:idUser',[auth, checkRoles(['user'])],getHistory);//user

module.exports = {
    requestsRouter,
    historyRouter,
    statusRouter
};