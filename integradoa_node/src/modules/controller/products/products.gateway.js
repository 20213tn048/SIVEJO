const {query}= require ('../../../utils/mysql');
const insert = async (product) => {
    if (!product.name|| ! product.category || ! product.price) throw Error("Revisa el campo");
    const sql = `INSERT INTO productos (name,category,price) VALUES (?,?,?);`;
    const {insertId} = await  query(sql,[product.name,product.category,product.price]);
    return {...product, insertId};
};
const findAll  = async () => {
    const sql = `SELECT pro.*, ca.category_name FROM productos pro JOIN category ca ON pro.category = ca.id;`;
    return await query(sql,[]);
};

const findById = async (id) => {
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
    insert,findAll,findById,deleteId,updateById
};