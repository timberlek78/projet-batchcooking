import prisma from "../db.js";

class TokenModel {
		async create(token) {
			return await prisma.token.create({data : token});
		}

		async findById(tokenId) {
			return await prisma.token.findUnique({
				where: { token_id: tokenId },
			});
		}

		async findByValue(tokenValue) {
			return await prisma.token.findUnique({
				where: { token_value: tokenValue },
			});
		}

		async findAll() {
			return await prisma.token.findMany();
		}

		async update(tokenId, data) {
			return await prisma.token.update({
				where: { token_id: tokenId },
				data,
			});
		}

		async delete(tokenId) {
			return await prisma.token.delete({
				where: { token_id: tokenId },
			});
		}

		async deleteExpired() {
			return await prisma.token.deleteMany({
				where: {
					token_expire: { lt: new Date() },
				},
			});
		}
}

export default new TokenModel();