# Express ChatGPT

Simple interface para probar ChatGPT.

![image](https://user-images.githubusercontent.com/108734/224945972-14d97732-ecd7-48da-b0bb-402954e086ea.png)


## Tecnología

- ExpressJS para el backend
- VueJS para el frontend

Puedes encontrar una versión que sólamente requiere Vue: https://github.com/akobashikawa/vue-chatgpt

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
- El markdown devuelto por ChatGPT es convertido a HTML.
- Se hace highlight de los bloques `code`.
