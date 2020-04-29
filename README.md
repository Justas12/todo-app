# todo-app
### Installation

```sh
$ git clone https://github.com/Justas12/todo-app.git
$ cd todo-app
$ git submodule init
$ git submodule update
$ docker-compose build
$ docker-compose up
```

### View
In browser: http://localhost (port 80)

### Usage
<pre>
- GET    http://localhost/todos                     -->   Fetch all objects
- GET    http://localhost/todos/{id}                -->   Fetch object with specified id
- POST   http://localhost/todos                     -->   Create new object (At minimum 'text' and 'patient' property is required)
- PUT    http://localhost/todos/{id}                -->   Update existing object
- PATCH  http://localhost/todos/{id}                -->   Toggle 'completed' field (true/false) on specified object
- PATCH  http://localhost/todos/{id}?key=value      -->   update field 'key' with 'value' on specified object
- DELETE http://localhost/todos                     -->   Delete all objects
- DELETE http://localhost/todos/{id}                -->   Delete object with specified id
</pre>


### POST
```
// creates an entry with existing patient id
{
  "text": "example1",
  "patient": 123
}

// creates new patient in patients database and then creates an entry with new patient id
{
  "text": "example2",
  "patient": {
    "name": "name",
    "surname": "surname",
    "personalCode": "personalCode",
    "condition": "condition"
  }
}
```
