import * as ServiceManager from "../managers/ServiceManager.js"

export const getServices = async (req, res) => {
  try {
    const services = await ServiceManager.getServices()
    res.status(200).json(services)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getServiceById = async (req, res) => {
  try {
    const service = await ServiceManager.getServiceById(req.params.sid)
    if (!service) return res.status(404).json({ error: "Servicio no encontrado" })
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createService = async (req, res) => {
  try {
    const newService = await ServiceManager.addService(req.body)
    res.status(201).json(newService)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateService = async (req, res) => {
  try {
    const updated = await ServiceManager.updateService(req.params.sid, req.body)
    if (!updated) return res.status(404).json({ error: "Servicio no encontrado" })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteService = async (req, res) => {
  try {
    const deleted = await ServiceManager.deleteService(req.params.sid)
    if (!deleted) return res.status(404).json({ error: "Servicio no encontrado" })
    res.status(200).json({ message: "Servicio eliminado" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}