const pool = require('../database');  

// function to create table in the database
const createTable= async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE caseworker (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
         date DATE DEFAULT CURRENT_DATE 
      )
    `);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}




//create task in the data base
const createTask = async (req, res) => {
  const { title, description, status } = req.body;  
  try {

if( !title||  !status){

  res.status(400).json({message:"Fill all the required info"})
  return;
}

    const insertQuery = `
    INSERT INTO caseworker (title, description, status)
    VALUES ($1, $2, $3)
    RETURNING *
  `;


    const values = [title, description, status || 'pending'];
    const result = await pool.query(insertQuery, values);
    res.status(200).json({ task: result.rows[0] });
  } catch (err) {
    console.error('Error inserting task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// fectch al task from the data base
const getALLTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM caseworker ORDER BY id DESC');
    res.status(200).json({ tasks: result.rows });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

 // delete task by task id from the database
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {

    if(!id){
      res.status(400).json({message:"Task id is required"})
      return;
    }

    const result = await pool.query('DELETE FROM caseworker WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', deletedTask: result.rows[0] });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// update task with taskid 
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {

    if (!id) {
      return res.status(400).json({ message: 'Task ID is required' });
    }
    if (!title || !description || !status) {
      return res.status(400).json({ message: 'Title, description and status are required' });
    }

    const result = await pool.query(
      `UPDATE caseworker
       SET title = $1, description = $2, status = $3
       WHERE id = $4
       RETURNING *`,
      [title, description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', updatedTask: result.rows[0] });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// get task by id
const getTaskById = async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(400).json({message:"Task id is required"})
    return;
  }

  try {
    const result = await pool.query('SELECT * FROM caseworker WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task: result.rows[0] });
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = { createTask ,getALLTasks,deleteTask,updateTask,getTaskById};