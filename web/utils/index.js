exports.allowedMethods = methods => (req, res) => {
  res.set("Allow", methods);
  res.status(405).send("Method Not Allowed");
};
