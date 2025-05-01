import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // First, create a dummy user if none exists
  const dummyUser = await prisma.user.upsert({
    where: { email: "admin@ngoportal.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@ngoportal.com",
      password: "password123",
    },
  })

  console.log(`Created dummy user with id: ${dummyUser.id}`)

  // Create 6 dummy NGOs
  const dummyNGOs = [
    {
      name: "Clean Water Initiative",
      description:
        "We provide clean drinking water to rural communities across India. Our projects include well construction, water purification systems, and education on water conservation.",
      goal: 500000,
      location: "Mumbai, Maharashtra",
      userId: dummyUser.id,
    },
    {
      name: "Education For All",
      description:
        "Our mission is to ensure every child has access to quality education regardless of their socioeconomic background. We build schools, provide learning materials, and train teachers in underserved areas.",
      goal: 750000,
      location: "Delhi, NCR",
      userId: dummyUser.id,
    },
    {
      name: "Green Earth Foundation",
      description:
        "Dedicated to environmental conservation through tree planting, waste management programs, and renewable energy initiatives. We work with local communities to create sustainable practices.",
      goal: 350000,
      location: "Bengaluru, Karnataka",
      userId: dummyUser.id,
    },
    {
      name: "Healthcare For Villages",
      description:
        "We bring essential healthcare services to remote villages through mobile clinics, telemedicine, and training local health workers. Our focus is on preventive care and maternal health.",
      goal: 600000,
      location: "Chennai, Tamil Nadu",
      userId: dummyUser.id,
    },
    {
      name: "Women Empowerment Trust",
      description:
        "Supporting women through skill development, microfinance, and advocacy for gender equality. We help women become financially independent and leaders in their communities.",
      goal: 450000,
      location: "Jaipur, Rajasthan",
      userId: dummyUser.id,
    },
    {
      name: "Child Welfare Society",
      description:
        "Protecting vulnerable children through shelter homes, nutrition programs, education support, and counseling services. We work to ensure every child has a safe and nurturing environment.",
      goal: 550000,
      location: "Kolkata, West Bengal",
      userId: dummyUser.id,
    },
  ]

  for (const ngo of dummyNGOs) {
    const createdNGO = await prisma.nGO.upsert({
      where: { name_userId: { name: ngo.name, userId: ngo.userId } },
      update: ngo,
      create: ngo,
    })
    console.log(`Created NGO: ${createdNGO.name}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
