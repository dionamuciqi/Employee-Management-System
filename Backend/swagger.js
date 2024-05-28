import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Nodejs Express + MySQL API',
        description: 'Nodejs Express + MySQL API',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFile = ['./index.js'];

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
    import('./index.js');
});
