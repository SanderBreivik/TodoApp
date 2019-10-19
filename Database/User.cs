using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo.Database
{
    public class User   
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }

        public User(string username, string password, string email, string firstname, string lastname)

        {

            Username = username;
            Password = password;
            Email = email;
            Firstname = firstname;
            Lastname = lastname;

        }

    }
}
