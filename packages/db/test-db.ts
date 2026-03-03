// Quick test: can we query the users table?
import prisma from './src/client.js'

async function test() {
    try {
        console.log('Connecting...')
        const users = await prisma.user.findMany()
        console.log('Users found:', users.length, users.map(u => u.email))
    } catch (err) {
        console.error('DB ERROR:', err)
    } finally {
        await prisma.$disconnect()
    }
}

test()
