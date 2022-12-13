const { hashPassword } = require('../../../utils/functions');
const { query } = require('../../../utils/mysql');

const findAll  = async () => {
    const sql = `SELECT * from users;`;
    return await query(sql,[]);
}
const findById  = async (id) => {
    if (!id) throw Error("Missing fields");
    const sql = `SELECT * from users  WHERE id=?;`;
    return await query(sql,[id]);
}
const deleteId  = async (id) => {
    if (!id) throw Error("Missing fields");
    const sql = `DELETE from users WHERE id=?;`;
    return await query(sql,[id]);
}
const save = async (user) => {
    console.log(user);
    if (
        !user.name||!user.surname|| !user.lastname|| !user.phone|| !user.address|| !user.email || !user.password || !user.role || !user.status
    )
        throw Error('Missing fields');

    const sql = `INSERT INTO users (name,surname,lastname,phone,address,email, password, role, status) VAlUES (?,?,?,?,?,?,?,?,?);`;

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
       !user.name||!user.surname|| !user.lastname|| !user.phone|| !user.address|| !user.email || !user.password || !user.role || !user.status||!user.id
    )
        throw Error('Missing fields');

    const sql = `UPDATE users SET name=?,surname=?,lastname=?,phone=?,address=?,email=?, password=?, role=?, status=? WHERE id=?;`;

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
        user.id
    ]);

    delete user.password;
    return { ...user, id:updateId };
};
module.exports = {
    save, findAll,deleteId,findById,updateById
};
