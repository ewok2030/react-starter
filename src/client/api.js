export const ACCOUNT = {
  getCurrent: () => '/api/account/current',
  getAll: () => '/api/account/users'
};

export const EXAMPLE = {
  getExample: id => `/api/example/${id}`,
  getAllExamples: () => '/api/example/users'
};
