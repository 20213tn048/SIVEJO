const { hashPassword } = require('../../../utils/functions');
const { query } = require('../../../utils/mysql');

const findAll  = async () => {
    const sql = `SELECT * from usuarios;`;
    return await query(sql,[]);
}
const findById  = async (idUsuario) => {
    const sql = `SELECT * from usuarios  WHERE idUsuario=?;`;
    return await query(sql,[idUsuario]);
}
const deleteId  = async (idUsuario) => {
    const sql = `DELETE from usuarios WHERE idUsuario=?;`;
    return await query(sql,[idUsuario]);
}
const save = async (user) => {
    console.log(user);
    if (
        !user.name||!user.surname|| !user.lastname|| !user.phone|| !user.address|| !user.email || !user.password || !user.role || !user.status
    )
        throw Error('Missing fields');

    const sql = `INSERT INTO usuarios (name,surname,lastname,phone,address,email, password, role, status) VAlUES (?,?,?,?,?,?,?,?,?);`;

    const password = await hashPassword(user.password);
    const { insertId } = await query(sql, [
        user.name,
        user.surname,
        user.lastname,
        user.phone,
        user.address,
        user.email,
        password,
        user.role,
        user.status,

    ]);

    delete user.password;
    return { ...user, id: insertId };
};
const updateById = async (user) => {
    console.log(user);
    if (
       !user.name||!user.surname|| !user.lastname|| !user.phone|| !user.address|| !user.email || !user.password || !user.role || !user.status||!user.idUsuario
    )
        throw Error('Missing fields');

    const sql = `UPDATE usuarios SET name=?,surname=?,lastname=?,phone=?,address=?,email=?, password=?, role=?, status=? WHERE idUsuario=?;`;

    const password = await hashPassword(user.password);
    const { updateId } = await query(sql, [
        user.name,
        user.surname,
        user.lastname,
        user.phone,
        user.address,
        user.email,
        password,
        user.role,
        user.status,
    user.idUsuario
    ]);

    delete user.password;
    return { ...user, id:updateId };
};
module.exports = {
    save, findAll,deleteId,findById,updateById
};
