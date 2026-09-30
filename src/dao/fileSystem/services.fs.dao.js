import fs from "node:fs/promises"
import path from "node:path"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url) // convierto la URL en una ruta del sistema
const __dirname = path.dirname(__filename) // reconozco en qué directorio se encuentra el archivo en el que estoy
const FILE_PATH = path.join(__dirname, "../data/services.json") // armo la ruta que me permite llegar de la locación actual al json donde están mis datos

export async function getAll(){
    try {
        const content = await fs.readFile(FILE_PATH, "utf-8")
        const services = JSON.parse(content)        
        return services

    } catch (error) {
        if (error.code === 'ENOENT') return []
        throw error
    }
}

export async function create(serviceData) {
  const services = await getAll()

  const newService = {
    id: serviceData.id, // división de responsabiliades: ahora el service crea el id y el dao lo guarda
    name: serviceData.name,
    duration: serviceData.duration,
    price: serviceData.price,
    category: serviceData.category,
    available: serviceData.available
  }

  services.push(newService)

  await fs.writeFile(
    DEFAULT_PATH,
    JSON.stringify(services, null, 2)
  )

  return newService
}

export async function getById(id) {
    const services = await getAll()
    const found = services.find(service => service.id === id)
    return found ?? null
}

export async function update(id, changes) {
    const services = await getAll()

    // Busca el servicio en cuestión y recupera su índice
    const serviceIndex = services.findIndex(service => service.id === id)

  // Si no se encuentra el registro, devuelve null y finaliza
  if (serviceIndex === -1) return null
  
  // Destructuring de los cambios, quitando del medio el id en caso de que el usuario lo haya ingresado y agrupando en allowedChanges todo lo demás
  const { id: ignoredId, ...allowedChanges } = changes

  // Clonar objeto de services tomando los valores originales y sobreescribiendo aquellos que vienen de allowedChanges
  services[serviceIndex] = {
    ...services[serviceIndex],
    ...allowedChanges
  }

  // Guardar cambios en el JSON de services
  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(services, null, 2)
  )

  return true
}

export async function remove(id) {
  const services = await getAll()

  // Asigno a una variable todos los registros del JSON, excepto aquel que coincide con el ID del que quiero borrar
  const filteredServices = services.filter(service => service.id !== id)

  // Si el ID ingresado no existe, el resultado del filtrado será idéntico a la versión original de mis services; por tanto, no debo hacer nada y escapo
  if (filteredServices.length === services.length) return false

  // Sobreescribo en el JSON los datos filtrados; o sea, sin el registro eliminado
  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(filteredServices, null, 2)
  )

  return true
}

