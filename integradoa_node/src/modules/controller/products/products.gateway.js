const {query}= require ('../../../utils/mysql');
const insert = async (product) => {
    if (!product.descriptions|| ! product.category || ! product.price || ! product.stock) throw Error("Revisa el campo");
    const sql = `INSERT INTO products (description,category,price,stock) VALUES (?,?,?);`;
    const {insertId} = await  query(sql,[product.descriptions,product.category,product.price,product.stock]);
    return {...product, insertId};
};
const findAll  = async () => {
    const sql = `SELECT pro.*, ca.description as descriptions FROM products pro JOIN category ca ON pro.category = ca.id;`;
    return await query(sql,[]);
};

const findById = async (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = `SELECT pro.*, ca.description as descriptions FROM products pro JOIN category ca ON pro.category = ca.id WHERE pro.id=?;`;
    return await query(sql,[id]);
};

const deleteId = async  (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = 'DELETE from products WHERE id=?;';
    return await query(sql, [id]);
}

const updateById = async (product) =>{
    if (!product.descriptions|| ! product.category || ! product.price|| !product.id || !product.stock) throw Error("Revisa el campo");
    const sql = `UPDATE products SET description=?, category=?,price=?, stock=? WHERE id=?;`;
    const {updateId} = await  query(sql,[product.descriptions,product.category,product.price, product.stock, product.id]);
    return {...product,updateId};
}
 module.exports ={
    insert,findAll,findById,deleteId,updateById
};