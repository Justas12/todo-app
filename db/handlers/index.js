const Todo = require("../models/todo").Todo;

exports.getTodos = (req, res) => {
	Todo.find((err, result) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (result) {
			if (req.query.expand === 'patient') {
					result.map(el => {
						const rp = require("request-promise");
			      var options = {
			        method: "GET",
			        uri: "http://patients:8080/api/v1/patients/" + el.patient,
			      };
		        rp(options)
		          .then(function (data) {
		            data = JSON.parse(data);
		            el.patient = data;
		          })
		          .catch(function (err) {
		          });
				});
			}
			// fix !!!
			setTimeout(() => {
				res.status(200).send(result);
			}, 500);
			// fix !!!
		} else {
			res.status(404).send("not found");
		}
	});
};

exports.addTodo = (req, res) => {
	if (req.body.patient !== null && typeof req.body.patient === 'object') {
		const rp = require("request-promise");
		var info;
		info = {
      name: req.body.patient.name,
      surname: req.body.patient.surname,
      personalCode: req.body.patient.personalCode,
      condition: req.body.patient.condition,
    };
    var options = {
      method: "POST",
      uri: "http://patients:8080/api/v1/patients",
      json: true,
      body: info,
    };
    rp(options)
      .then(async function (data) {
	      delete req.body.patient;
	      req.body.patient = data.id;
	      console.log(req.body);
	      const todo = new Todo(req.body);
				todo.save((err, result) => {
					if (err) {
						res.status(500).send(err.message);
					} else if (result) {
						res.set("Location", "localhost/todos/".concat(result._id));
						res.status(201).send(`successufully saved object: ${result}`);
					} else {
						res.status(400).send("bad request");
					}
				});
			})
		.catch(function (err) {
			//res.status(err.statusCode).send(err.error.message);
			req.body.patient = 1;
			const todo = new Todo(req.body);
			todo.save((err, result) => {
				if (err) {
					res.status(500).send(err.message);
				} else if (result) {
					res.set("Location", "localhost/todos/".concat(result._id));
					res.status(201).send(`successufully saved object: ${result}`);
				} else {
					res.status(400).send("bad request");
				}
			});
		});
	}
	else {
		const todo = new Todo(req.body);
		todo.save((err, result) => {
			if (err) {
				res.status(500).send(err.message);
			} else if (result) {
				res.set("Location", "localhost/todos/".concat(result._id));
				res.status(201).send(`successufully saved object: ${result}`);
			} else {
				res.status(400).send("bad request");
			}
		});
	}
}

exports.deleteTodos = (req, res) => {
	Todo.deleteMany({}, (err, result) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (result.deletedCount > 0) {
			res.status(200).send(`successufully deleted objects`);
		} else {
			res.status(404).send("not found");
		}
	});
};

exports.getTodo = (req, res) => {
	const id = req.params.id;
	Todo.findById(id, (err, result) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (result) {
				const rp = require("request-promise");
	      var options = {
	        method: "GET",
	        uri: "http://patients:8080/api/v1/patients/" + result.patient,
	      };
        rp(options)
          .then(async function (data) {
            data = JSON.parse(data);
            res.status(200).send({ todo: result, patient: data });
          })
          .catch(async function (err) {
            // res.status(err.statusCode).send(err.error.message);
            console.log(err);
            res.status(200).send(result);
          });
		} else {
			console.log(result);
			res.status(404).send("not found");
		}
	});
};

const update = (id, fields, res) => {
	Todo.updateOne({ _id: id }, { $set: fields }, (err, result) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (result.ok === 1) {
			res.status(200).send(`successufully updated object`);
		} else {
			res.status(400).send("could not update object");
		}
	});
};

exports.editTodo = (req, res) => {
	const id = req.params.id;
	const fields = req.query;
	if (Object.keys(fields).length === 0) {
		Todo.findById(id, (err, result) => {
			if (err) {
				res.status(500).send(err.message);
			} else if (result) {
				update(id, { completed: !result.completed }, res);
			} else {
				res.status(404).send("not found");
			}
		});
	} else {
		update(id, fields, res);
	}
};

exports.replaceTodo = (req, res) => {
	const id = req.params.id;
	if (req.body.patient !== null && typeof req.body.patient === 'object' && req.body.text) {
		const rp = require("request-promise");
		var info;
		info = {
      name: req.body.patient.name,
      surname: req.body.patient.surname,
      personalCode: req.body.patient.personalCode,
      condition: req.body.patient.condition,
    };
    var options = {
      method: "POST",
      uri: "http://patients:8080/api/v1/patients",
      json: true,
      body: info,
    };
    rp(options)
      .then(async function (data) {
	      delete req.body.patient;
	      req.body.patient = data.id;
	      Todo.replaceOne({ _id: id }, req.body, (err, result) => {
					if (err) {
						res.status(500).send(err.message);
					} else if (result.ok === 1) {
						res.status(200).send(`successufully replaced object`);
					} else {
						res.status(400).send("could not replace object");
					}
				});
			})
		.catch(function (err) {
			req.body.patient = 1;
			// res.status(err.statusCode).send(err.error.message);
			Todo.replaceOne({ _id: id }, req.body, (err, result) => {
					if (err) {
						res.status(500).send(err.message);
					} else if (result.ok === 1) {
						res.status(200).send(`successufully replaced object`);
					} else {
						res.status(400).send("could not replace object");
					}
				});
			});
		}
		else if (req.body.text) {
			Todo.replaceOne({ _id: id }, req.body, (err, result) => {
				if (err) {
					res.status(500).send(err.message);
				} else if (result.ok === 1) {
					res.status(200).send(`successufully replaced object`);
				} else {
					res.status(400).send("could not replace object");
				}
			});
		} else {
			res.status(400).send("'text' property is missing");
		}
};

exports.deleteTodo = (req, res) => {
	const id = req.params.id;
	Todo.findByIdAndDelete(id, (err, result) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (result) {
			res.status(200).send(`successufully deleted object: ${result}`);
		} else {
			res.status(404).send("not found");
		}
	});
};
