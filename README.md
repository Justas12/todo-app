# todo-app
### Installation

```sh
$ git clone https://github.com/Justas12/todo-app.git
$ cd todo-app
$ git submodule update --init
$ docker-compose up --build
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


### REST Examples
#### POST

```
// creates an entry with specified patient id
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

### SOAP Examples
Endpoint: localhost/wsdl

#### Get Todo/Todos

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:GetTodoRequest>
         <!--Optional:-->
         <tem:id>?</tem:id>
      </tem:GetTodoRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Delete Todo/Todos

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:DeleteTodoRequest>
         <!--Optional:-->
         <tem:id>?</tem:id>
      </tem:DeleteTodoRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Add Todo

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:AddTodoRequest>
         <tem:text>?</tem:text>
         <tem:patient>?</tem:patient>
         <!--Optional:-->
         <tem:completed>?</tem:completed>
         <!--Optional:-->
         <tem:due>?</tem:due>
      </tem:AddTodoRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Update Todo

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:UpdateTodoRequest>
         <tem:id>?</tem:id>
         <!--Optional:-->
         <tem:text>?</tem:text>
         <!--Optional:-->
         <tem:patient>?</tem:patient>
         <!--Optional:-->
         <tem:completed>?</tem:completed>
         <!--Optional:-->
         <tem:due>?</tem:due>
      </tem:UpdateTodoRequest>
   </soapenv:Body>
</soapenv:Envelope>
```
