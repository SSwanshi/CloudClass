import { PrismaClient } from '../lib/generated/prisma'

const database = new PrismaClient();

async function main() {
    try{
        await database.category.createMany({
            data: [
    // Academic & Professional
    { name: "Computer Science" },
    { name: "Engineering" },
    { name: "Mathematics" },
    { name: "Business & Finance" },
    { name: "Accounting" },
    { name: "Science" },
    { name: "Medicine & Healthcare" },
    { name: "Law & Legal Studies" },
    { name: "Architecture & Design" },
    { name: "Environmental Science" },

    // Creative Arts
    { name: "Music" },
    { name: "Photography" },
    { name: "Graphic Design" },
    { name: "Filming" },
    { name: "Creative Writing" },
    { name: "Fine Arts" },
    { name: "Fashion Design" },
    { name: "Game Development" },

    // Technology & IT
    { name: "Web Development" },
    { name: "Mobile App Development" },
    { name: "Cloud Computing" },
    { name: "Blockchain" },
    { name: "UI/UX Design" },
    { name: "IT Certifications" },

    // Personal Development
    { name: "Personal Finance" },
    { name: "Productivity" },
    { name: "Public Speaking" },
    { name: "Psychology" },
    { name: "Languages" },
    { name: "Parenting" },
    { name: "Cooking" },

    // Health & Fitness
    { name: "Fitness" },
    { name: "Yoga & Meditation" },
    { name: "Nutrition" },
    { name: "Sports Training" },
    { name: "Martial Arts" },

    // Vocational & Technical
    { name: "Automotive Repair" },
    { name: "Electrician & Plumbing" },
    { name: "Carpentry" },
    { name: "Agriculture" },
    { name: "Aviation" },

    // Other
    { name: "Test Prep" },
    { name: "Career Development" },
    { name: "Digital Marketing" },
    { name: "Real Estate" },
    { name: "History" },
    { name: "Philosophy" },

    // Catch-all
    { name: "Other" }
]
        });
        console.log("Success");
    }catch(error) {
        console.log("Error seeding the database categories", error);
    } finally{
        await database.$disconnect();
    }
}

main();