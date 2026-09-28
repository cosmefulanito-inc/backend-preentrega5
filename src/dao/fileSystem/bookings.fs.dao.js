import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FILE_PATH = path.join(__dirname, "../data/bookings.json")

export async function getAll() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error;
  }
}

export async function getById(id) {
  const bookings = await getAll()
  return bookings.find(booking => booking.id === id) ?? null
}

export async function create(bookingData) {
  const bookings = await getAll()

  bookings.push(bookingData)

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(bookings, null, 2)
  )

  return bookingData
}

export async function update(id, changes) {
  const bookings = await getAll()

  const bookingIndex = bookings.findIndex(
    booking => booking.id === id
  )

  if (bookingIndex === -1) {
    return null;
  }

  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    ...changes
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(bookings, null, 2)
  )

  return bookings[bookingIndex]
}

export async function remove(id) {
  const bookings = await getAll()

  const filteredBookings = bookings.filter(booking => booking.id !== id)

  if (filteredBookings.length === bookings.length) return false

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(filteredBookings, null, 2)
  )

  return true
}
