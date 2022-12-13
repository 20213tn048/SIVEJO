const {query}= require ('../../../utils/mysql');
const insert = async (product) => {
<<<<<<< HEAD
    if (!product.description|| ! product.category || ! product.price || ! product.stock) throw Error("Revisa el campo");
    const sql = `INSERT INTO products (description,category,price,stock,images) VALUES (?,?,?,?,?);`;
    const {insertId} = await  query(sql,[product.description,product.category.id,product.price,product.stock, product.images]);
=======
    if (!product.descriptions|| ! product.category || ! product.price || ! product.stock) throw Error("Revisa el campo");
    const sql = `INSERT INTO products (description,category,price,stock,images) VALUES (?,?,?,?,?);`;
    const {insertId} = await  query(sql,[product.descriptions,product.category,product.price,product.stock, product.images]);
>>>>>>> e8d2a2b1a3ab931a31b80d75c81acc799f241171
    return {...product, insertId};
};
const findAll  = async () => {
    const sql = `SELECT pro.*, ca.description as descriptions FROM products pro JOIN category ca ON pro.category = ca.id;`;
    return await query(sql,[]);
};

const findById = async (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = `SELECT pro.*, ca.description as descriptions FROM products pro JOIN category ca ON pro.category = ca.id WHERE pro.id=?`;
    return await query(sql,[id]);
};

const deleteId = async  (product) => {
    console.log(product.id);
    if (!product.id) throw Error ('Missing fields');
    const sql = 'DELETE from products WHERE id=?;';
    return await query(sql, [product.id]);
}

const updateById = async (product) =>{
    if (!product.description|| ! product.category || ! product.price|| !product.id || !product.stock) throw Error("Revisa el campo");
    const sql = `UPDATE products SET description=?, category=?,price=?, stock=? WHERE id=?;`;
    const {updateId} = await  query(sql,[product.description,product.category.id,product.price, product.stock, product.id]);
    return {...product,updateId};
}

const updateImagePath = async (update) =>{
    if (!update.path || !update.idProduct ) throw Error("Revisa el campo");
    const sql = `UPDATE products SET images=? WHERE id=?;`;
    const {updateId} = await  query(sql,[update.path, update.idProduct]);
    return {...update,updateId};
}
 module.exports ={
    insert,findAll,findById,deleteId,updateById,updateImagePath
};