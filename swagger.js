import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = ["./server/app.js"];
const API_URL = `${import.meta.env.VITE_SWAGGER_URL}`;

const doc ={
  info:  {
    title:
    'API de Adopción de mascotas',
    description: 'Esta API permite gestionar mascotas y usuarios'
  },
  host: API_URL,
  schemes: ['http']
}
swaggerAutogen  (outputFile, endpointsFiles, doc);