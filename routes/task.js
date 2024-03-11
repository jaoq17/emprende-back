const express = require("express")
const { getAll, update, remove, create } = require("../controllers/task")
const router = express.Router()

// configurar RUTAS
router.get("/", getAll )
router.post("/", create )
router.put("/:id", update )
router.delete("/:id", remove )

module.exports = router