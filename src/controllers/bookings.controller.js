import * as BookingManager from "../managers/BookingManager.js"
import * as ServiceManager from "../managers/ServiceManager.js"

export const createBooking = async (req, res) => {
  try {
    const newBooking = await BookingManager.createBooking(req.body)

    res.status(201).json({
      status: "success",
      data: newBooking
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No se pudo crear la reserva.",
      error: error.message
    })
  }
}

export const getBookingById = async (req, res) => {
  try {
    const { bid } = req.params
    const booking = await BookingManager.getBookingById(bid)

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada."
      })
    }

    res.status(200).json({
      status: "success",
      data: booking
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params

    const service = await ServiceManager.getServiceById(sid)

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado."
      })
    }

    const updatedBooking = await BookingManager.addServiceToBooking(bid, sid)

    if (!updatedBooking) {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada."
      })
    }

    res.status(200).json({
      status: "success",
      message: "Servicio agregado a la reserva.",
      data: updatedBooking
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No se pudo agregar el servicio a la reserva.",
      error: error.message
    })
  }
}