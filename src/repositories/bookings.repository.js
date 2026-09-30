import * as dao from "../dao/fileSystem/bookings.fs.dao"

export async function getAll(){
    return dao.getAll()
}

export async function getById(id){
    return dao.getById(id)
}

export async function create(bookingData){
    return dao.create(bookingData)
}

export async function update(id, changes){
    return dao.update(id, changes)
}

export async function remove(id) {
    return dao.remove(id)
}
