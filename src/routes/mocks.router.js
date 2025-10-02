//ruta de mocks, ruta de prueba
import { Router } from "express";
import { generateMockUsers } from "../utils/mockingUsers.js";

const router = Router();

router.get("/mockingusers", (req, res) => {
  try {
    const users = generateMockUsers(50);
    res.json({
      success: true,
      message: "50 usuarios generados exitosamente",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al generar los usuarios",
      error: error.message,
    });
  }
});

router.get("/", (req, res) => {
  res.send("Ruta de mocks funcionando!!");
});
router.get("/mockingpets", (req, res) => {
  try {
    // Generar 100 mascotas de ejemplo (mock data)
    const mockPets = [];
    for (let i = 1; i <= 100; i++) {
      mockPets.push({
        id: i + 1,
        name: `mascota ${i + 1}`,
        type: ["perro", "gato", "conejo"][Math.floor(Math.random() * 3)],
        adopted: Math.random() > 0.5,
      });
    }
    res.json({
      success: true,
      massage: "100 mascotas generadas exitosamente",
      pets: mockPets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al generar las mascotas",
      error: error.message,
    });
  }
});

export default router;
