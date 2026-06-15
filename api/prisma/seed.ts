import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const entries = [
    { key: 'brandLine1', value: 'LENS' },
    { key: 'brandBy', value: 'BY' },
    { key: 'brandLine2', value: 'MIKE' },
    { key: 'heroLabel', value: 'Street & Sports Photographer / Barcelona, ES' },
    { key: 'heroSubtitle', value: 'Photographs by Miguel Pujazón Cárdenas' },
    {
      key: 'heroParagraph',
      value:
        'I shoot motion and the street — the heat off a MotoGP straight, the lean of a classic bike at Montjuïc, the half-second a city gives you on a corner. No staging, no retouching beyond the grade. Just the frame I caught.',
    },
  ];

  for (const entry of entries) {
    await prisma.siteConfig.upsert({
      where: { key: entry.key },
      update: {},
      create: entry,
    });
  }

  console.log('Seed complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
