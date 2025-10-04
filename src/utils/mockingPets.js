

import { faker } from '@faker-js/faker';

export const generateMockPets = (quantity) => {
    const mockPets = [];
    
    const species = ['perro', 'gato', 'conejo', 'pajaro', 'pez', 'hamster'];
    
    for (let i = 0; i < quantity; i++) {
        const name = faker.person.firstName();
        const specie = species[Math.floor(Math.random() * species.length)];
        let imageUrl = "";

        switch (specie) {
          case "perro":
            imageUrl = "https://loremflickr.com/640/480/dog";
            break;
          case "gato":
            imageUrl = "https://loremflickr.com/640/480/cat";
            break;
          case "conejo":
            imageUrl = "https://loremflickr.com/640/480/rabbit";
            break;
          case "pajaro":
            imageUrl = "https://loremflickr.com/640/480/bird";
            break;
          case "pez":
            imageUrl = "https://loremflickr.com/640/480/fish";
            break;
          case "hamster":
            imageUrl = "https://loremflickr.com/640/480/hamster";
            break;
          default:
            imageUrl = "https://loremflickr.com/640/480/animal";
        }

        mockPets.push({
            name: name,
            specie: specie,
            birthDate: faker.date.past({ years: 10 }),
            adopted: false,
            image: imageUrl,
        });
    }
    
    return mockPets;
};