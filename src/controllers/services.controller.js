import * as serviceServices from "../services/services.service.js"

export const ControllerGetServices = async (req, res) => {
  try {
    const services = await serviceServices.getServices()
    res.status(200).json(services)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ControllerGetServiceById = async (req, res) => {
  try {
    const service = await serviceServices.getServiceById(req.params.sid)
    if (!service) return res.status(404).json({ error: "Servicio no encontrado" })
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ControllerCreateService = async (req, res) => {
  try {
    const newService = await serviceServices.addService(req.body)
    res.status(201).json(newService)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ControllerUpdateService = async (req, res) => {
  try {
    const updated = await serviceServices.updateService(req.params.sid, req.body)
    if (!updated) return res.status(404).json({ error: "Servicio no encontrado" })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ControllerDeleteService = async (req, res) => {
  try {
    const deleted = await serviceServices.deleteService(req.params.sid)
    if (!deleted) return res.status(404).json({ error: "Servicio no encontrado" })
    res.status(200).json({ message: "Servicio eliminado" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}