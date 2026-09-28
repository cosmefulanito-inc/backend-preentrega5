# Sistema Backend de Turnos y Reservas

API REST construida con Node.js y Express para gestionar servicios y reservas. Los datos se almacenan en archivos JSON.

## Tecnologías

- Node.js
- Express
- dotenv

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/cosmefulanito-inc/backend-preentrega4.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd backend-preentrega4
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto, tomando como modelo `.env.example`:

```
PORT=8080
NODE_ENV=development
```

## Ejecución

```bash
npm start
```

El servidor queda disponible en `http://localhost:8080`.

## Estructura del proyecto

```
src/
  config/
    env.config.js
  controllers/
    services.controller.js
    bookings.controller.js
  managers/
    ServiceManager.js
    BookingManager.js
  routes/
    services.router.js
    bookings.router.js
  data/
    services.json
    bookings.json
  app.js
  server.js
```

El proyecto separa responsabilidades en tres capas:

- **routes/**: definen los endpoints y los conectan con su controller. No contienen lógica.
- **controllers/**: leen `req.params`, `req.query` y `req.body`, llaman al manager correspondiente y devuelven la respuesta.
- **managers/**: manejan la lógica de datos sobre los archivos JSON, sin usar `req` ni `res`.

## Endpoints

### Services

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/services` | Lista todos los servicios. Admite filtros por query: `category` y `available` |
| GET | `/api/services/:sid` | Obtiene un servicio por su id |
| POST | `/api/services` | Crea un nuevo servicio |
| PUT | `/api/services/:sid` | Actualiza un servicio existente |
| DELETE | `/api/services/:sid` | Elimina un servicio |

Ejemplo de filtro: `GET /api/services?category=salud&available=true`

Campos obligatorios para crear un servicio:

```json
{
  "name": "Consulta general",
  "duration": 30,
  "price": 5000,
  "category": "salud",
  "available": true
}
```

### Bookings

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crea una nueva reserva |
| GET | `/api/bookings/:bid` | Obtiene una reserva por su id |
| POST | `/api/bookings/:bid/services/:sid` | Agrega