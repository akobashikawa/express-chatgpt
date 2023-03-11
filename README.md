# Express ChatGPT

Simple interface para probar ChatGPT.

## Instalación

- Clonar el repositorio
- `npm install`
- `npm start`
- http://localhost:3000
- Ingresar en la configuración el apiKey obtenido en tu cuenta OpenAI
- También se puede indicar en el apiKey en el url:
    - http://localhost:3000/?apiKey=secret
- El _Historial_ del chat se puede mantener temporalmente en la memoria del servidor. Se elimina con el boton _Limpiar_ o cada vez que se reinicia el servidor.
- El historial correspondiente a cada apiKey se guarda por separado.

## Tecnología

- ExpressJS para el backend
- VueJS para el frontend