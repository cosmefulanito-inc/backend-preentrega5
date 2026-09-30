import { Router } from "express";

import {
  ControllerGetAll,
  ControllerCreateBooking,
  ControllerGetBookingById,
  ControllerBookingUpdate,
  ControllerDeleteBooking
} from "../controllers/bookings.controller.js"

const router = Router()

router.get("/", ControllerGetAll)
router.get("/:bid", ControllerGetBookingById)
router.post("/", ControllerCreateBooking)
router.post("/:bid/services/:sid", ControllerBookingUpdate)
router.delete("/:bid", ControllerDeleteBooking)


export default router