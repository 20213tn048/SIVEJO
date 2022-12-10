const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const { save, findAll, deleteId, updateById,findById} = require('./user.gateway');
const {auth, checkRoles} = require("../../../config/jwt");
const {transporter, template} = require("../../../utils/email-service");
const path = require("path");
const fs = require("fs");

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
        const info = await transporter.sendMail({
            from: `Personal App <${process.env.EMAIL_USER}>`,
            to: email,
            subject:'Successful Registration',
            text:'Te has registrado correctamente en la plataforma',
            html: fs.readFileSync(path.join(__dirname, '../../../templates/','index.html')) + `<tr>
                                                                        <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>${email}</strong></p></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-left:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>${password}</strong></p></td>
                                                                    </tr>` +
                fs.readFileSync(path.join(__dirname, '../../../templates/','index2.html'))
        });
        console.log(info);
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
