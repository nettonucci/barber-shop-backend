import swaggerAutogen from "swagger-autogen";

// WINDOWS ONLY
//const outputFile = "src/utils/swagger/swagger_output.json";
//const endpointsFiles = ["src/routes/index.js"];

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../../routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles);
