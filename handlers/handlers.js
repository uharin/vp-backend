export const getAllCases = async (req, res) => {
  console.log(req.method);
  return res.status(200).send('hello world!');
};

export const getCase = async (req, res) => {
  console.log(req.method);
};

export const createReport = async (req, res) => {
  console.log(req.body);
  res.status(200).send('post');
};

export const updateReport = async (req, res) => {
  console.log(req.method);
};

export const deleteReport = async (req, res) => {
  console.log(req.method);
};
