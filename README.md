# Express ChatGPT

Simple interface para probar ChatGPT.

## Tecnología

- ExpressJS para el backend
- VueJS para el frontend

## Instalación

- Clonar el repositorio
- `npm install`
- `npm start`
- http://localhost:3000
- Ingresa en la configuración el *apiKey* obtenido en tu cuenta OpenAI
- También se puede indicar en el apiKey en el url:
    - http://localhost:3000/?apiKey=secret

## Demo
- https://express-chatgpt.onrender.com
- En la configuración, marcando la opción *Mantener historial en la RAM del servidor*, el historial del chat se mantiene temporalmente en la memoria del servidor, hasta que se elimine con el boton _Limpiar_ o cada se reinicie el servicio.
- El historial correspondiente a cada apiKey se guarda por separado, de modo que dos personas puedan usar la aplicación independientemente.
