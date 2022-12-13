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
    if (!category.descriptions) throw Error("Revisa el campo");
    const sql = `INSERT INTO category (description) VALUES (?);`;
    const {insertId} = await  query(sql,[category.descriptions]);
    return {category, id:insertId};
};
const deleteId = async  (id) => {
    if (!id) throw Error ('Missing fields');
    const sql = 'DELETE from category WHERE id=?;';
    return await query(sql, [id]);
};
const updateById = async (category) =>{
    if (!category.descriptions || !category.id) throw Error("Revisa el campo");
    const sql = `UPDATE category SET description=? WHERE id=?;`;
    const {updateId} = await  query(sql,[category.descriptions,category.id]);
    return {...category,updateId};
}
module.exports ={
    insert,findAll,findById,deleteId,updateById
};