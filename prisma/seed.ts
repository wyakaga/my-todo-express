import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/id_ID";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
	await prisma.user.deleteMany({});

	const amountOfUsers = 3;

	const users: Omit<User, "id">[] = [];

	for (let i = 0; i < amountOfUsers; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const password = bcrypt.hashSync(`${firstName + lastName}`, 10)

		const user: Omit<User, "id"> = {
			email: faker.internet.email({ firstName, lastName }),
			password,
			firstName,
			lastName,
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
		};

		users.push(user);
	}

	const addUsers = async () => await prisma.user.createMany({ data: users });

	addUsers();
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
