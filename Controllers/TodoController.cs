﻿using System;
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
            NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432; User Id=postgres; Password=admin; Database=todoapp");

            return conn;
        }

        /* GET request. Gets all todos.
         * 
         */
        [HttpGet]
        public List<Todo> Index()
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();

            NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM \"Todos\"", conn);

            NpgsqlDataReader dr = cmd.ExecuteReader();

            List<Todo> Todos = new List<Todo>();
            while (dr.Read())
            {
                Todo t = new Todo
                {
                    id = Convert.ToInt32(dr["id"]),
                    title = dr["title"].ToString(),
                    description = dr["description"].ToString(),
                    type = dr["type"].ToString(),
                    completed = Boolean.Parse(dr["completed"].ToString()),
                    userid = Convert.ToInt32(dr["userid"])
                };
                Todos.Add(t);
            }


            conn.Close();
            return Todos;
        }


        /* GET request. Use route 'todo/{userid}' where userid is the id
         * of the user you want to get todos from.
        */
        [HttpGet("{userid}")]
        [Route("todo/{userid}")]
        public IActionResult GetUserTodos([FromRoute (Name ="userid")] int? userid)
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();

            List<Todo> Todos = new List<Todo>();
            using (var cmd = new NpgsqlCommand("SELECT * FROM \"Todos\" WHERE userid=@id", conn))
            {
                cmd.Parameters.AddWithValue("id", userid);
                NpgsqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Todo t = new Todo
                    {
                        id = Convert.ToInt32(dr["id"]),
                        title = dr["title"].ToString(),
                        description = dr["description"].ToString(),
                        type = dr["type"].ToString(),
                        completed = Boolean.Parse(dr["completed"].ToString()),
                        userid = Convert.ToInt32(dr["userid"])
                    };
                    Todos.Add(t);
                    
                }
                conn.Close();

                return Ok(Todos);
            }
           
        }


        /* POST request. Use route 'create'. Creates a new todo
         * to the user.
         */
        // POST: Todo/Create
        [HttpPost]
        [Route("create")]
        public ActionResult Create([FromBody] Todo todo)
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();
            using (var cmd = new NpgsqlCommand($"INSERT INTO \"Todos\" (title, description, type, completed, userid) VALUES (@title, @description, @type, @completed, @userid)", conn))
            {
                cmd.Parameters.AddWithValue("title", todo.title);
                cmd.Parameters.AddWithValue("description", todo.description);
                cmd.Parameters.AddWithValue("type", todo.type);
                cmd.Parameters.AddWithValue("completed", todo.completed);
                cmd.Parameters.AddWithValue("userid", todo.userid);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
            return Ok(todo);
        }

        /* POST request. Use route 'update'. Toggles the completion
         * of a todo.
         */
        [HttpPost]
        [Route("update")]
        public IActionResult Update([FromBody] Todo todo)
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();
            using (var cmd = new NpgsqlCommand($"UPDATE \"Todos\" SET completed = NOT completed WHERE id = @id", conn))
            {
                cmd.Parameters.AddWithValue("id", todo.id);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
            return Ok(todo);
        }


        /* POST request. Use route 'delete'. Deletes a specified todo
         * 
         */
        [HttpPost]
        [Route("delete")]
        public IActionResult Delete([FromBody] Todo todo)
        {
            NpgsqlConnection conn = getDbConnection();
            conn.Open();
            using (var cmd = new NpgsqlCommand($"DELETE FROM \"Todos\" WHERE id = @id", conn))
            {
                cmd.Parameters.AddWithValue("id", todo.id);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
            return Ok(todo);
        }

    }
}