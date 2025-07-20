# 🧠 Bitespeed Backend Task: Identity Reconciliation

This project implements the `/identify` endpoint for **Bitespeed's identity reconciliation system**. It deduplicates and links customer contact information (email and phone numbers) to provide a unified customer identity for FluxKart.com.

## 🔗 Hosted API Endpoint

> 🌐 [https://your-api.onrender.com/identify](https://your-api.onrender.com/identify)

> 🛠️ **Replace the link above with your Render URL**

---

## 📦 Tech Stack

- **Backend:** Node.js + Express + TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Deployment:** Render
- **Validation:** Zod or Express Validator

---

## 📘 API Specification

### Endpoint

POST /identify 

Content-Type: application/json

### Request Body

```json
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```

>Both fields are optional, but at least one must be provided.

### Response Body
```json
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["lorraine@hillvalley.edu","mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}
```
## 🧠 How It Works

- Each contact can be linked by matching either email or phoneNumber.

- The oldest contact becomes primary; the rest are secondary and point to the primary via linkedId.

- If new data comes in that doesn't match any existing contact, it creates a new primary contact.

- If new data partially matches existing contacts (e.g. same phone but different email), a new secondary contact is created.

- If merging two primaries, the older one remains primary and the newer becomes secondary.

## 🛠️ Setup & Development

1. Clone the Repoode
```Bash
git clone https://github.com/your-username/bitespeed-identity.git

cd bitespeed-identity
```
2. Install Dependencies
```Bash
npm install
```
3. Set Up Environment Variables
Create a .env file:

```env
DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
DIRECT_URL="postgresql://user:password@host:port/dbname?schema=public"
PORT=4000
```
4. Setup Prisma and Migrate
```bash
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
```
5. Run the Server
```bash
npm run dev
```
## 🗃️ Database Schema
```prisma
model Contact {
  id             Int       @id @default(autoincrement())
  phoneNumber    String?   
  email          String?   
  linkedId       Int?      
  linkPrecedence LinkPrecedence @default(PRIMARY)
  linkedContact  Contact?       @relation("ContactLink", fields: [linkedId], references: [id])
  contacts       Contact[]      @relation("ContactLink")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  deletedAt      DateTime?

  @@index([email])
  @@index([phoneNumber])
}

enum LinkPrecedence {
  PRIMARY
  SECONDARY
}
```
## 🧪 Testing
Use Postman or curl to test:

```js
curl -X POST https://your-api.onrender.com/identify \
  -H "Content-Type: application/json" \
  -d '{"email": "doc@brown.com", "phoneNumber": "999999"}'
```
## 🧾 Example Scenarios

| Email |	PhoneNumber |	Outcome |
|:------|:------------|---------|
| george@hillvalley.edu	| 919191	| Creates primary contact |
| biffsucks@hillvalley.edu | 717171	| Creates another primary contact |
| george@hillvalley.edu	| 717171	| Merges biff's contact as secondary |

## 📤 Deployment
This app is deployed using Render.com.

Push to main automatically redeploys your app.

## 📚 References
Way Of Life At Bitespeed

🤝 Author
Manu Jayakumar
💼 LinkedIn
📧 manujayakumar@example.com

