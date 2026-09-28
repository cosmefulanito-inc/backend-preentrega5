# Sistema Backend de Turnos y Reservas

API REST construida con Node.js y Express para gestionar servicios y reservas. Los datos se almacenan en archivos JSON.

## Tecnologías

- Node.js
- Express
- dotenv

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/cosmefulanito-inc/backend-preentrega5.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd backend-preentrega5
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

## Arquitectura por capas

El proyecto está organizado en capas. Cada una tiene una única responsabilidad y solo se comunica con la capa inmediatamente inferior:

```
Petición HTTP
     ↓
  Router        → define el endpoint
     ↓
  Controller    → lee la request y arma la response
     ↓
  Service       → aplica las reglas del negocio
     ↓
  Repository    → intermediario entre el negocio y el acceso a datos
     ↓
  DAO           → lee y escribe los archivos JSON
     ↓
  data/*.json
```

- **routes/**: definen los endpoints y los conectan con su controller. No contienen lógica.
- **controllers/**: leen `req.params`, `req.query` y `req.body`, llaman al service correspondiente y responden con `res.status().json()`. Son la única capa que conoce Express.
- **services/**: contienen las reglas del negocio. Por ejemplo, que toda reserva nueva se crea con estado `pending` y sin servicios, que el `id` de un registro no se puede modificar, o que agregar a una reserva un servicio que ya tiene incrementa su cantidad.
- **repositories/**: exponen al service las operaciones de datos (`getAll`, `getById`, `create`, `update`, `remove`) y las delegan en el DAO.
- **dao/**: acceden directamente a los archivos JSON. Guardan los datos tal como los reciben, sin tomar decisiones.

Gracias a esta separación, reemplazar los archivos JSON por una base de datos (por ejemplo, MongoDB) solo requiere crear un nuevo DAO con las mismas funciones: el resto de las capas no cambia.

## Estructura del proyecto

```
src/
  config/
    env.config.js
  routes/
    services.router.js
    bookings.router.js
  controllers/
    services.controller.js
    bookings.controller.js
  services/
    service.service.js
    booking.service.js
  repositories/
    services.repository.js
    bookings.repository.js
  dao/
    services.fs.dao.js
    bookings.fs.dao.js
  data/
    services.json
    bookings.json
  app.js
  server.js
```

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
| GET | `/api/bookings` | Lista todas las reservas |
| POST | `/api/bookings` | Crea una nueva reserva |
| GET | `/api/bookings/:bid` | Obtiene una reserva por su id |
| POST | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva existente. Valida que el servicio exista |
| DELETE | `/api/bookings/:bid` | Elimina una reserva |

Ejemplo de body para crear una reserva:

```json
{
  "clientName": "Ana Pérez",
  "clientEmail": "ana@mail.com",
  "date": "2026-10-15",
  "time": "10:30"
}
```

Toda reserva nueva se crea con estado `pending` y sin servicios. Si el mismo servicio se agrega más de una vez a una reserva, se incrementa su cantidad (`quantity`).