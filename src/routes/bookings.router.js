import { Router } from "express";

import {
  createBooking,
  getBookingById,
  addServiceToBooking
} from "../controllers/bookings.controller.js"

const router = Router()

// Consultar reserva por id
router.get("/:bid", getBookingById)

// Crear una nueva reserva
router.post("/", createBooking)

// Agregar un servicio a una reserva existente
router.post("/:bid/services/:sid", addServiceToBooking)

export default router