const {query}= require ('../../../utils/MySql');

const insert = async (request) => {
    console.log(request);
    if (!request.idUser|| ! request.idProduct || ! request.idStatus) throw Error("Revisa el campo");
    const sql = `INSERT INTO history (idUser,idProduct,idStatus) VALUES (?,?,?);`;
    const {insertId} = await  query(sql,[request.idUser,request.idProduct,request.idStatus]);
    return {...request, insertId};
};
const findAll  = async () => {
    const sql = `SELECT pro.*, ca.category_name FROM productos pro JOIN category ca ON pro.category = ca.id;`;
    return await query(sql,[]);
};

const findByUserIdStatusID = async (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = `SELECT pro.*, ca.category_name FROM productos pro JOIN category ca ON pro.category = ca.id WHERE pro.id=?;`;
    return await query(sql,[id]);
};

const deleteId = async  (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = 'DELETE from productos WHERE id=?;';
    return await query(sql, [id]);
}

const updateById = async (product) =>{
    if (!product.name|| ! product.category || ! product.price|| !product.id) throw Error("Revisa el campo");
    const sql = `UPDATE productos SET name=?, category=?,price=? WHERE id=?;`;
    const {updateId} = await  query(sql,[product.name,product.category,product.price,product.id]);
    return {...product,updateId};
}
module.exports ={
    insert,findAll,deleteId,updateById
};