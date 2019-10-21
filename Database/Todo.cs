using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo.Database
{
    public class Todo
    {
        public string title { get; set; }
        public string description { get; set; }
        public string type { get; set; }
        public bool completed { get; set; }

        public Todo()

        {

        }
    }
}
