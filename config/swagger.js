const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
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
          url: "https://momofin.com/v1/auth/",
          description: 'Development server',
        },
      ],
    },
    apis: ["./routes/*/*.js"],
  };

  module.exports = {swopt : options}