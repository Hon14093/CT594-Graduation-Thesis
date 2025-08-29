## Software Engineering Thesis:
# BUILDING A LAPTOP E-COMMERCE WEB APPLICATION WITH INTEGRATED HARDWARE COMPATIBILITY CHECKER
An e-commerce full stack website selling laptops using React.js, Express.js, PostgreSQL, Redis and Prisma ORM. Features hardware compatibility checker for laptop and add-on accessories. The web app follows the Microservices architecture.

### 1. Techstacks:
- Frontend: React.js, Shadcn, Tailwind CSS.
- Backend: Express.js, JWT.
- Database: PostgreSQL, Redis.
- Deployment Tool: Docker (locally).
- Third-party API: Cloudinary (storing images), Stripe (handling payments).

### 2. Architecture:
<img width="731" height="621" alt="Laptopia-microservices drawio" src="https://github.com/user-attachments/assets/1c11dae2-40e6-46c9-9237-3c5fa3953a48" /> <br>
The system followed the Microservices architecture, this might not be the most accurate represntation of this architecture. There are 5 microservices with 4 databases as shown in the diagram. <br>
Note: Compatibility Service and Product Service use the same database because Compatibility Service only reads the data and doesn't make any changes to the data.

### 3. Class diagram:
<img width="1326" height="863" alt="Laptopia-Horizontal DB drawio (1)" src="https://github.com/user-attachments/assets/ba8e24e8-4fc8-4126-9c1c-7efebfcbcf0f" />
The class diagram above represents the system's overall database. In practice, this big database is split into 4 smaller databases.
