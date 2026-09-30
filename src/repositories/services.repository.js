import * as dao from "../dao/fileSystem/services.fs.dao"

export async function getAll(){
    return dao.getAll()
}

export async function create(data) {
    return dao.create(data)
}

export async function getById(id) {
    return dao.getById(id)
}

export async function remove(id){
    return dao.remove(id)
}

export async function update(id, changes){
    return dao.update(id, changes)
}