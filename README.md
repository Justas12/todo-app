# todo-app
### Installation

```sh
$ docker-compose build
$ docker-compose up
```

### View
In browser: http://localhost (port 80)

### Usage
<pre>
- GET http://localhost/todos          -->   Fetch all objects
- GET http://localhost/todos{id}      -->   Fetch object with specified id
- POST http://localhost/todos         -->   Create new object (At minimum 'text' property is required)
- PUT http://localhost/todos{id}      -->   Update existing object
- DELETE http://localhost/todos       -->   Delete all objects
- DELETE http://localhost/todos{id}   -->   Delete object with specified id
</pre>
