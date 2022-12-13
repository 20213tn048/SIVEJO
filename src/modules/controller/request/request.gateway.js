const {query}= require ('../../../utils/MySql');

const insert = async (request) => {
    console.log(request);
    if (!request.idUser|| ! request.idProduct || ! request.idStatus || !request.counts) throw Error("Revisa el campo");
    const sql = `INSERT INTO sales (idUser,idProduct,idStatus,count) VALUES (?,?,?,?);`;
    const {insertId} = await  query(sql,[request.idUser,request.idProduct,request.idStatus,request.counts]);
    return {...request, insertId};
};
const findHistory  = async (idUser) => {
    if (!idUser) throw Error("Revisa el campo");
    if (idUser === 1);
    const sql = `SELECT * FROM users where users.id = ?;`;
    return await query(sql,[idUser]);
};

const findByStatus = async (idStatus) => {
    if (!idStatus) throw Error ('Missing fields');
    const sql = `SELECT * FROM requests WHERE idStatus = ?`;
    return await query(sql,[idStatus]);
};

const findBySales = async (idSales) =>{
    if (!idSales) throw Error('Missing fields');
    const sql = `SELECT * FROM SALES WHERE id = ?`;
    return await query(sql,[idSales]);
}

const updateById = async (sales) =>{
    if (!sales.idSales || !sales.idStatus) throw Error("Revisa el campo");
    const sql = `UPDATE sales SET idStatus = ?    WHERE id = ?;`;
    const {updateId} = await  query(sql,[sales.idStatus, sales.idSales]);
    return {...sales,updateId};
}

const deleteId = async  (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = 'DELETE from productos WHERE id=?;';
    return await query(sql, [id]);
}

module.exports ={
    insert,findHistory,deleteId,updateById,findByStatus, findBySales
};