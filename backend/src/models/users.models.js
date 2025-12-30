import prisma from '../db.js';

export default class UsersModels {
	static getAll() {
		return prisma.users.findMany();
	}

	static async getById(user_id) {
		return await prisma.users.findUnique({ where: { user_id } });
	}

	static async findByEmail(email) {
		return await prisma.users.findUnique({ where: { email } });
	}

	static async create(username, email, password) {
		return prisma.users.create({ data: { username, email, password } });
	}

	static update(user_id, data) {
		return prisma.users.update({
			where: { user_id },
			data,
		});
	}

	static delete(user_id) {
		return prisma.users.delete({ where: { user_id } });
	}
}
