var seeder = require("mongoose-seed");

seeder.connect(process.env.DB_URI || "mongodb://db:27017/todo-app", () => {
  seeder.loadModels(["./db/models/todo"]);
  seeder.clearModels(["todo"], () => {
    seeder.populateModels(data, (err, done) => {
      console.log("seeding data: ", data);
      if (err) {
        console.log("seed err: ", err);
      } else {
        console.log("seed done!");
      }
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: "todo",
    documents: [
      {
        text: "gydymas1",
        due: "2021-08-09",
        patient: 1
      },
      {
        text: "gydymas2",
        due: "2022-12-01",
        patient: 2
      },
      {
        text: "gydymas3",
        due: "2222-02-20",
        patient: 3
      }
    ]
  }
];
