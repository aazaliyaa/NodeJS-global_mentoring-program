const GroupService = {
  createGroup: (reqBody) => ({
    name: reqBody.name,
    permissions: reqBody.permissions,
  }),

};

export default GroupService;
