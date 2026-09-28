import { Router } from "express"

import {
  ControllerGetServices,
  ControllerGetServiceById,
  ControllerCreateService,
  ControllerUpdateService,
  ControllerDeleteService
} from "../controllers/services.controller.js"

const router = Router()

router.get("/", ControllerGetServices)
router.get("/:sid", ControllerGetServiceById)
router.post("/", ControllerCreateService)
router.put("/:sid", ControllerUpdateService)
router.delete("/:sid", ControllerDeleteService)

export default router