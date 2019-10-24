using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using todo.Database;

namespace todo.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        public User Index(User user)
        {
            return user;
        }

        public NpgsqlConnection getDbConnection()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432; User Id=admin; Password=admin; Database=todoapp");

            return conn;
        }

        /* GET request. Use route 'user'. Gets all users. 
         *
        */
        [HttpGet]
        public List<User> GetUsers()
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();

            NpgsqlCommand cmd = new NpgsqlCommand("SELECT firstname, lastname, id FROM Users", conn);

            NpgsqlDataReader dr = cmd.ExecuteReader();
            
            List <User> Users = new List<User>();
            while (dr.Read()) {
                User u = new User
                {
                    firstname = dr["firstname"].ToString(),
                    lastname = dr["lastname"].ToString(),
                    id = Convert.ToInt32(dr["id"])
                };
                Users.Add(u);
            }
           
            conn.Close();
            return Users;
           
        }

        /* POST request. Use route 'create'. Creates a new user. 
         * 
         */
        [HttpPost]
        [Route("create")]
        public ActionResult CreateUser([FromBody] User user)
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();
            using (var cmd = new NpgsqlCommand($"INSERT INTO Users (username, password, email, firstname, lastname) VALUES (@username, @password, @email, @firstname, @lastname)", conn))
            {
                cmd.Parameters.AddWithValue("username", user.username);
                cmd.Parameters.AddWithValue("password", user.password);
                cmd.Parameters.AddWithValue("email", user.email);
                cmd.Parameters.AddWithValue("firstname", user.firstname);
                cmd.Parameters.AddWithValue("lastname", user.lastname);
                cmd.ExecuteNonQuery();
            }
            conn.Close();

            return Ok(user);
        }

    }
}