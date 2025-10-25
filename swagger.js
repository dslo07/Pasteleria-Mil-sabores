import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = ["./server/app.js"];

const doc ={
  info:  {
    title:
    'API de Adopción de mascotas',
    description: 'Esta API permite gestionar mascotas y usuarios'
  },
  host: "localhost:5174/api",
  schemes: ['http']
}
swaggerAutogen  (outputFile, endpointsFiles, doc);