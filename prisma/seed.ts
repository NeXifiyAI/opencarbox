/**
 * Prisma Seed Script
 * ==================
 * 
 * Erstellt Test- und Demo-Daten für Entwicklung.
 * 
 * Ausführen mit: npx prisma db seed
 */

import { PrismaClient, UserRole, CustomerType, OrderStatus, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Test-Benutzer erstellen
  console.log('Creating users...');
  
  const testCustomer = await prisma.user.upsert({
    where: { email: 'kunde@test.de' },
    update: {},
    create: {
      email: 'kunde@test.de',
      name: 'Max Mustermann',
      phone: '+43 664 1234567',
      role: UserRole.CUSTOMER,
      customerType: CustomerType.B2C,
      newsletter: true,
      language: 'de',
    },
  });

  const testB2BCustomer = await prisma.user.upsert({
    where: { email: 'firma@test.de' },
    update: {},
    create: {
      email: 'firma@test.de',
      name: 'Firma GmbH',
      companyName: 'Test Firma GmbH',
      taxId: 'ATU12345678',
      role: UserRole.CUSTOMER,
      customerType: CustomerType.B2B,
      newsletter: false,
      language: 'de',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@opencarbox.at' },
    update: {},
    create: {
      email: 'admin@opencarbox.at',
      name: 'Admin User',
      role: UserRole.ADMIN,
      customerType: CustomerType.B2B,
    },
  });

  console.log(`✓ Created ${3} users`);

  // 2. Kategorien erstellen
  console.log('Creating categories...');

  const categoryBremsbelaege = await prisma.category.upsert({
    where: { slug: 'bremsbelaege' },
    update: {},
    create: {
      name: 'Bremsbeläge',
      slug: 'bremsbelaege',
      description: 'Hochwertige Bremsbeläge für alle Fahrzeugtypen',
      sortOrder: 1,
      isActive: true,
    },
  });

  const categoryOelfilter = await prisma.category.upsert({
    where: { slug: 'oelfilter' },
    update: {},
    create: {
      name: 'Ölfilter',
      slug: 'oelfilter',
      description: 'Ölfilter für optimale Motorschmierung',
      sortOrder: 2,
      isActive: true,
    },
  });

  const categoryLuftfilter = await prisma.category.upsert({
    where: { slug: 'luftfilter' },
    update: {},
    create: {
      name: 'Luftfilter',
      slug: 'luftfilter',
      description: 'Luftfilter für saubere Motorluft',
      sortOrder: 3,
      isActive: true,
    },
  });

  console.log(`✓ Created ${3} categories`);

  // 3. Produkte erstellen
  console.log('Creating products...');

  const product1 = await prisma.product.upsert({
    where: { sku: 'BRK-001' },
    update: {},
    create: {
      sku: 'BRK-001',
      name: 'Premium Bremsbeläge Vorne',
      slug: 'premium-bremsbelaege-vorne',
      description: 'Hochwertige Bremsbeläge für die Vorderachse. Geringe Staubentwicklung, optimale Bremsleistung.',
      price: 89.99,
      comparePrice: 119.99,
      stock: 25,
      categoryId: categoryBremsbelaege.id,
      brand: 'Bosch',
      images: ['/images/products/bremsbelaege-vorne.jpg'],
      isActive: true,
      isFeatured: true,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { sku: 'OEL-001' },
    update: {},
    create: {
      sku: 'OEL-001',
      name: 'Ölfilter Universal',
      slug: 'oelfilter-universal',
      description: 'Universeller Ölfilter für die meisten Fahrzeugmodelle. Original-Qualität.',
      price: 12.99,
      stock: 150,
      categoryId: categoryOelfilter.id,
      brand: 'Mann Filter',
      images: ['/images/products/oelfilter.jpg'],
      isActive: true,
      isFeatured: false,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { sku: 'LFT-001' },
    update: {},
    create: {
      sku: 'LFT-001',
      name: 'Luftfilter Premium',
      slug: 'luftfilter-premium',
      description: 'Premium Luftfilter mit hoher Filterleistung und langer Lebensdauer.',
      price: 24.99,
      comparePrice: 34.99,
      stock: 80,
      categoryId: categoryLuftfilter.id,
      brand: 'K&N',
      images: ['/images/products/luftfilter.jpg'],
      isActive: true,
      isFeatured: true,
    },
  });

  console.log(`✓ Created ${3} products`);

  // 4. Fahrzeuge erstellen
  console.log('Creating vehicles...');

  const vehicle1 = await prisma.vehicle.create({
    data: {
      userId: testCustomer.id,
      hsn: '0603',
      tsn: 'AWD',
      licensePlate: 'W-AB 1234',
      brand: 'Volkswagen',
      model: 'Golf',
      variant: 'VII GTI',
      year: 2018,
      nickname: 'Mein Golf',
      mileage: 85000,
    },
  });

  console.log(`✓ Created ${1} vehicle`);

  // 5. Service-Kategorien erstellen
  console.log('Creating service categories...');

  const serviceCategory = await prisma.serviceCategory.upsert({
    where: { slug: 'inspektion' },
    update: {},
    create: {
      name: 'Inspektion & Wartung',
      slug: 'inspektion',
      description: 'Regelmäßige Inspektionen und Wartungsarbeiten',
      sortOrder: 1,
    },
  });

  // 6. Services erstellen
  console.log('Creating services...');

  const service1 = await prisma.service.upsert({
    where: { slug: 'service-gross' },
    update: {},
    create: {
      categoryId: serviceCategory.id,
      name: 'Großer Service',
      slug: 'service-gross',
      description: 'Komplette Inspektion inkl. Ölwechsel, Filter, Bremsen-Check',
      priceFrom: 299,
      priceTo: 499,
      priceType: 'FROM',
      durationMinutes: 120,
      isActive: true,
    },
  });

  console.log(`✓ Created ${1} service`);

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
