const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "User Management API",
        version: "0.1.0",
        description:
          "This is a simple CRUD API For User Management",
        license: {
          name: "",
          url: "",
        },
        contact: {
          name: "",
          url: "",
          email: "",
        },
      },
      servers: [
        {
          url: "",
          description: 'Development server',
        },
      ],
    },
    apis: ["./routes/*/*.js"],
  };

  module.exports = {swopt : options}