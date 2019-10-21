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
    public class TodoController : Controller
    {

        public NpgsqlConnection getDbConnection()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432; User Id=admin; Password=admin; Database=todoapp");

            return conn;
        }

        // GET: Todo
        [HttpGet]
        public List<Todo> Index()
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();

            NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM Todos", conn);

            NpgsqlDataReader dr = cmd.ExecuteReader();

            List<Todo> Todos = new List<Todo>();
            while (dr.Read())
            {
               Todo t = new Todo
                {
                    title = dr["title"].ToString(),
                    description = dr["description"].ToString(),
                    type = dr["type"].ToString(),
                    completed = Boolean.Parse(dr["completed"].ToString())
                };
                Todos.Add(t);
            }


            conn.Close();
            return Todos;
        }

        // POST: Todo/Create
        [HttpPost]
        [Route("create")]
        public ActionResult Create([FromBody] Todo todo)
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();
            using (var cmd = new NpgsqlCommand($"INSERT INTO Todos (title, description, type, completed, userid) VALUES (@title, @description, @type, @completed)", conn))
            {
                cmd.Parameters.AddWithValue("username", todo.title);
                cmd.Parameters.AddWithValue("password", todo.description);
                cmd.Parameters.AddWithValue("email", todo.type);
                cmd.Parameters.AddWithValue("firstname", todo.completed);
                cmd.ExecuteNonQuery();
            }



            return Ok(todo);
        }

    }
}