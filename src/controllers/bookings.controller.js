import * as bookingServices from "../services/bookings.service.js"

import * as serviceServices from "../services/services.service.js"

export const ControllerGetAll = async (req, res) => {
  try {
    const bookings = await bookingServices.getBookings()
    res.status(200).json({
      status: "success",
      data: bookings
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

export const ControllerCreateBooking = async (req, res) => {
  try {
    const newBooking = await bookingServices.createBooking(req.body)
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

export const ControllerGetBookingById = async (req, res) => {
  try {
    const { bid } = req.params
    const booking = await bookingServices.getBookingById(bid)

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

export const ControllerBookingUpdate = async (req, res) => {
  try {
    const { bid, sid } = req.params


    const service = await serviceServices.getServiceById(sid)
    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado."
      })
    }

    const updatedBooking = await bookingServices.updateBooking(bid, { serviceId: sid })
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

export const ControllerDeleteBooking = async (req, res) => {
  try {
    const { bid } = req.params
    const deleted = await bookingServices.removeBooking(bid)

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada."
      })
    }

    res.status(200).json({
      status: "success",
      message: "Reserva eliminada correctamente."
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}