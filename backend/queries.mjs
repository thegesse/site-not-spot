import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({connectionString: process.env.DATABASE_URL})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({adapter})

export async function getAllPeople() {
    return await prisma.fingMany()
}
export async function addPerson(name, email) {
    return await prisma.people.create({
        data: { name, email },
    })
}
export async function deletePerson(id){
    return await prisma.people.delete({
        where: { id }
    })
}

export async function disconnect() {
    await prisma.disconnect()
}