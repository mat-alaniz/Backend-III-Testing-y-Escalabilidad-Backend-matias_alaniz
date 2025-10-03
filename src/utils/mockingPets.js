// módulo de mocking de mascotas
import { faker } from '@faker-js/faker';

export const generateMockPets = (quantity) => {
    const mockPets = [];

    const species = ['perro', 'gato', 'pajaro', 'pez', 'Hamster', 'conejo'];

    for (let i = 0; i < quantity; i++) {
        const name = faker.person.firstName();
        mockPets.push({
            name: name,
            specie: species[Math.floor(Math.random() * species.length)], // <--- aquí el cambio
            birthDate: faker.date.past({ years: 10 }), //mascotas de hasta 10 años
            adopted: false,
            image: faker.image.url(), // Imagen aleatoria válida
        });
    }
    return mockPets;
};