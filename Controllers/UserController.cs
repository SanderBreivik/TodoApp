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
        public NpgsqlConnection getDbConnection()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432; User Id=admin; Password=admin; Database=todoapp");

            return conn;
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();

            List <User> Users = new List<User>();

            using (NpgsqlTransaction t = conn.BeginTransaction())
            {
                using (var cmd = new NpgsqlCommand("SELECT * FROM Users", conn))
                {
                    NpgsqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        Console.WriteLine(dr);
                    }
                }
                t.Commit();
            }
            
           
            Users.Add(new User("test", "test", "test", "test", "test"));
            Users.Add(new User("test2", "test2", "test2", "test2", "test2"));

            conn.Close();
            return Users;
           
        }


        // POST: User/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreateUser(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                NpgsqlConnection conn = getDbConnection();
                conn.Open();
                User u = new User("sanbre", "pwd", "s.b@live.no", "Sander", "Breivik");
                //NpgsqlCommand cmd2 = new NpgsqlCommand($"INSERT INTO USERS VALUES({u.Username},{u.Password},{u.Email},{u.Firstname},{u.Lastname}", conn);

                using (var cmd2 = new NpgsqlCommand("INSERT INTO USERS VALUES(@username, @password, @email, @firstname, @lastname)", conn))
                {
                    cmd2.Parameters.AddWithValue("username", u.Username);
                    cmd2.Parameters.AddWithValue("password", u.Password);
                    cmd2.Parameters.AddWithValue("email", u.Email);
                    cmd2.Parameters.AddWithValue("firstname", u.Firstname);
                    cmd2.Parameters.AddWithValue("lastname", u.Lastname);
                    Console.WriteLine($"CMD: {cmd2.CommandText}");
                    var rows = cmd2.ExecuteNonQuery();
                    Console.WriteLine($"{rows} affected");

                }


                conn.Close();

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }



        // POST: User/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}