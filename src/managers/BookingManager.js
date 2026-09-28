import { promises as fs } from "node:fs"
import { randomUUID } from "node:crypto"

const DEFAULT_PATH = "./src/data/bookings.json"

// Leer todos los servicios de data
export async function getBookings(path = DEFAULT_PATH) {
  const content = await fs.readFile(path, "utf-8")
  const bookings = JSON.parse(content)
  return bookings
}

export async function createBooking (bookingData) {
  const bookings = await getBookings()

  const newBooking = {
    id: randomUUID(),
    clientName: bookingData.clientName,
    clientEmail: bookingData.clientEmail,
    date: bookingData.date,
    time: bookingData.time,
    status: "pending",
    services: []
  }

  bookings.push(newBooking)

  await fs.writeFile(
    DEFAULT_PATH,
    JSON.stringify(bookings, null, 2)
  )

  return newBooking
}

export async function getBookingById (id) {
    const bookings = await getBookings()
    const found = bookings.find(booking => booking.id === id)
    return found ?? null // Si el resultado de la búsqueda es null o undefined, se procesa como null
}

export async function addServiceToBooking (bookingId, serviceId) {
    const bookings = await getBookings()

    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId)

    if (bookingIndex === -1) return null

    
    const existingService = bookings[bookingIndex].services.find(s => s.service === serviceId)
    
    
    if (!existingService){
        bookings[bookingIndex].services.push({ service: serviceId, quantity: 1 })
    } else{
        existingService.quantity ++
    }
    
    await fs.writeFile(
        DEFAULT_PATH,
        JSON.stringify(bookings, null, 2)
    )

    return bookings[bookingIndex]
}