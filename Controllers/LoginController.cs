using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace todo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller
    {
        public NpgsqlConnection getDbConnection()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432; User Id=admin; Password=admin; Database=todoapp");

            return conn;
        }
     
        /*
         POST request. Use route 'login'. The body contains a user
         object with password and username.
        */

        [HttpPost]
        [Route("login")]
        public ActionResult Login([FromBody] Login user )
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();
            
            using (var cmd = new NpgsqlCommand("SELECT COUNT(*) FROM Users WHERE username=@username AND password=@password", conn))
            {
                cmd.Parameters.AddWithValue("username", user.username);
                cmd.Parameters.AddWithValue("password", user.password);
                var result = cmd.ExecuteScalar();
                int i = Convert.ToInt32(result);
                if (i==0)
                {
                    conn.Close();
                    return NotFound();
                } else
                {
                    using (var cmd2 = new NpgsqlCommand("SELECT id FROM users WHERE username=@username", conn))
                    {
                        cmd2.Parameters.AddWithValue("username", user.username);
                        NpgsqlDataReader dr = cmd2.ExecuteReader();

                        while (dr.Read())
                        {
                            int id = Convert.ToInt32(dr["id"]);
                            conn.Close();
                            return Ok(id);
                        }
                    }
                    conn.Close();

                    return NotFound();
                }

                
            }
       
        }
        

    }
}