const http = require('http');

function beforeRender(req, res, done) {
  const usabiDataEndpoint = 'http://127.0.0.1:4000/user_projects/usabi_data/';

  http.get(usabiDataEndpoint, response => {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      if (response.statusCode === 200) {
        try {
          const usabiData = JSON.parse(data);
          req.data = { usabiData: usabiData };
        } catch (error) {
          console.error('Error al parsear JSON:', error);
        }
      } else {
        console.error('Error en la solicitud. Código de estado:', response.statusCode);
      }

      done();
    });
  }).on('error', error => {
    console.error('Error en la solicitud:', error);
    done();
  });
}
