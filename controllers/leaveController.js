const createHttpError = require("http-errors");
const connection = require("../database");

exports.viewAllUsers = async(req, res) => {
  let user_id = req.session.user_id;
    
   function findUserRole() {
    let query = `SELECT type.user_type
    from user_management.users as users
   left join user_management.user_type type on type.id = users.user_type
   where users.id = '${user_id}'`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].user_type);
        }
      });
    });
  }
  const user_role = await findUserRole();
  function getAllUsers() {
    let query = `SELECT id,name,surname
    from user_management.users as users
   where users.user_type not in (1)`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }
  function getAllLeaves() {
    let query = `SELECT id,leave_type
    from user_management.leaves`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }
  function getAllShifts() {
    let query = `SELECT id,shift_name,start_at,end_at
    from user_management.shift_types`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }
  if(user_role == 'admin'){
    const users = await getAllUsers();
    const leaves = await getAllLeaves();
    const shifts = await getAllShifts();
   // console.log(shifts);
    let obj = {
        users : users,
        leave : leaves,
        shifts: shifts
    }
    console.log(obj)
    res.status(200).render('leave', {obj , session :req.session});
    
  }
  

};
