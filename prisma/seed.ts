import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      avatarUrl: 'https://source.unsplash.com/random',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Bolao do Jhon',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-19T12:00:00.431Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-20T14:00:00.431Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'FR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()