import * as repository from "../repositories/services.repository.js"
import {randomUUID} from "crypto"

export async function getServices() {
  return repository.getAll()
}

export async function getServiceById(id) {
  return repository.getById(id)
}

export async function addService(data) {
  const newData = {...data, id: randomUUID()} // tomo los datos que llegan por req param, copio en memoria y les asigno un id random antes de pasarlo al DAO
  return repository.create(newData) 
}

export async function deleteService(id){
    return repository.remove(id)
}

export async function updateService(id, changes){
    return repository.update(id, changes)
}
