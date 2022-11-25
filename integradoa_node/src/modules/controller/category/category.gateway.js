const {query}= require ('../../../utils/mysql');

const findAll = async () =>{
    const sql = `SELECT * FROM category;`;
    return await query(sql,[]);
};
const findById = async (id) =>{
    if (!id) throw Error("Missing fields");
    const sql = `SELECT * FROM category WHERE id=?;`;
    return await query(sql,[id]);
};
const insert = async (category) => {
    if (!category.category_name) throw Error("Revisa el campo");
    const sql = `INSERT INTO category (category_name) VALUES (?);`;
    const {insertId} = await  query(sql,[category.category_name]);
    return {category, id:insertId};
};
const deleteId = async  (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = 'DELETE from category WHERE id=?;';
    return await query(sql, [id]);
};
const updateById = async (category) =>{
    if (!category.category_name || !category.id) throw Error("Revisa el campo");
    const sql = `UPDATE category SET category_name=? WHERE id=?;`;
    const {updateId} = await  query(sql,[category.category_name,category.id]);
    return {...category,updateId};
}
module.exports ={
    insert,findAll,findById,deleteId,updateById
};