import userRepository from "../repositories/userRepository.js";

export default async function seedUser() {
  try {
    const seedData = {
      name: "Alessandro",
      lastName: "Davila",
      email: "alessandro.davila@tecsup.edu.pe",
      age: 20,
      phoneNumber: "946138123",
      password: "12345678", 
    };

    let user = await userRepository.findByEmail(seedData.email);
    if (!user) {
      user = await userRepository.create(seedData);
      console.log("Usuario semilla creado:", user.email);
    } else {
      console.log("Usuario semilla ya existe:", user.email);
    }

    return user;
  } catch (error) {
    console.error("Error al crear usuario semilla:", error.message);
  }
}
