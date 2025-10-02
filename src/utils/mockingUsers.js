//generador de usuarios falsos
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

//funcion para generar usuario falso

export const generateMockUsers = (quantity) => {
    const mockUsers = [];
    for (let i = 0; i < quantity; i++) {
        const hashedPassword = bcrypt.hashSync('coder123', 10);

        //rol aleatorio usuario o admin
        const randomRole = Math.random() < 0.5 ? 'user' : 'admin';

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        //crear usuario con formato mongoDB
        mockUsers.push({
            _id: faker.database.mongodbObjectId(),
            first_name: firstName,
            last_name: lastName,
            email: faker.internet.email({ firstName, lastName }),
            password: hashedPassword,
            rol: randomRole,
            pets: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
return mockUsers;

};