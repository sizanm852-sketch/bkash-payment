# bKash Payment Integration

A full-stack bKash Tokenized Checkout payment integration built with **React + TypeScript** (frontend) and **Express + TypeScript** (backend).

---

## 🗂️ Project Structure

```
bkashwithpayment/
├── bakash/          # React frontend (Vite + TypeScript + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.tsx      # Checkout page
│   │   │   ├── Success.tsx   # Payment success page
│   │   │   └── Error.tsx     # Payment error page
│   │   ├── App.tsx
│   │   └── index.css
│   └── package.json
└── server/          # Express backend (TypeScript)
    ├── src/
    │   ├── paymentController.ts  # Create & execute payment logic
    │   ├── middleware.ts         # bKash token grant middleware
    │   ├── route.ts             # API routes
    │   └── index.ts             # Express app entry
    └── package.json
```

---

## 📋 Prerequisites

Make sure you have these installed before starting:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
# Server
PORT=5001

# bKash Sandbox Credentials
bkash_username=sandboxTokenizedUser02
bkash_password=sandboxTokenizedUser02@12345
bkash_api_key=4f6o0cjiki2rfm34kfdadl1eqq
bkash_secret_key=2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b

# bKash Sandbox API URLs
bkash_grant_token_url=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant
bkash_create_payment_url=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create
bkash_execute_payment_url=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute
bkash_refund_transaction_url=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/refund

# Database (MongoDB)
db_url=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
```

> **Example with real MongoDB Atlas URL:**
> ```env
> db_url=mongodb+srv://myuser:mypassword@cluster0.habfyfx.mongodb.net/?appName=Cluster0
> ```

> ⚠️ Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## 🚀 Installation & Setup

### Step 1 — Clone the repository

```bash
git clone <your-repo-url>
cd bkashwithpayment
```

---

### Step 2 — Setup the Backend (Server)

```bash
# Go into the server folder
cd server

# Install all dependencies
npm install
```

Create the `.env` file inside `server/` using the values from the **Environment Variables** section above:

```bash
# Create .env file (Linux/macOS)
touch .env

# Then open it and paste in the environment variables
```

Start the development server:

```bash
npm run dev
```

✅ Backend runs at: **`http://localhost:5001`**

---

### Step 3 — Setup the Frontend

Open a **new terminal**, then:

```bash
# Go into the frontend folder
cd bakash

# Install all dependencies
npm install

# Start the frontend dev server
npm run dev
```

✅ Frontend runs at: **`http://localhost:5173`**

---

## 🖱️ How to Use

### Making a Test Payment

1. Open your browser and go to **`http://localhost:5173`**

2. You will see the **payment checkout page** with the amount displayed

3. Click the **"Pay with bKash"** button

4. You'll be redirected to the **bKash Sandbox payment page**

5. Enter the test credentials below:

| Field | Value |
|---|---|
| 📱 bKash Account Number | `01770618575` |
| 🔢 OTP | `123456` |
| 🔐 PIN | `12121` |

6. Click **Confirm** — you'll be redirected to your **success page** with:
   - ✅ Transaction ID
   - ✅ Amount Paid
   - ✅ Invoice ID (e.g. `INV-4A7B2C9D1E3F`)

> 💡 These sandbox credentials only work on `sandbox.payment.bkash.com` — not in production.

---

### Customizing the Payment Amount

Edit the `ORDER` object at the top of `bakash/src/components/Home.tsx`:

```ts
const ORDER = {
  amount: 50,   // ← Change this to your desired amount
  orderId: 1,
}
```

---

## 💳 Payment Flow

```
User clicks "Pay with bKash"
    ↓
Backend middleware: Grant Token from bKash
    ↓
Backend: Create Payment → generates unique Invoice ID (INV-XXXXXXXXXXXX)
         stores invoice + amount in memory (node-global-storage)
    ↓
User redirected to bKash Sandbox hosted payment page
    ↓
User enters test credentials and completes payment
    ↓
bKash calls: GET /bkash/payment/callback?paymentID=...&status=success
    ↓
Backend: Execute Payment → retrieves trxID, amount, invoiceID
    ↓
User redirected to /success page with transaction details
```

---

## 🔗 API Endpoints

### Backend (`http://localhost:5001`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payment/create/bkash` | Initiates a bKash payment |
| `GET` | `/bkash/payment/callback` | bKash callback after user completes payment |

### Request — Create Payment

```json
POST /api/payment/create/bkash

{
  "amount": 50
}
```

### Response — Create Payment

```json
{
  "url": "https://sandbox.payment.bkash.com/?paymentId=..."
}
```

---

## 🖥️ Frontend Pages

| Route | Description |
|---|---|
| `/` | Checkout page with Pay button |
| `/success?trxID=...&amount=...&invoiceID=...` | Payment success with details |
| `/error?status=...&message=...` | Payment failure with reason |

---

## 🛠️ Key Technologies / Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v3, Glassmorphism |
| Notifications | react-hot-toast |
| Routing | react-router-dom v7 |
| Backend | Express.js, TypeScript |
| Auth Token | node-global-storage |
| HTTP Client | Axios |
| Payment | bKash Tokenized Checkout API |
| Deployment | Vercel (Configured with `vercel.json`) |

---

## 🔒 Security Notes

- The bKash grant token is fetched fresh on every payment request via middleware
- `merchantInvoiceNumber` is generated server-side using UUID — never client-side
- Token is stored in server memory (`node-global-storage`) and never exposed to frontend
- All bKash API calls are made from the backend only

---

## 📦 Invoice ID Format

Invoice IDs are auto-generated on the server using UUID:

```
INV-4A7B2C9D1E3F
```

12 uppercase hex characters, always unique per transaction.

---

## ▶️ How to Run the Project

You need **two terminals** running at the same time — one for the backend, one for the frontend.

### Terminal 1 — Start the Backend

```bash
cd server
npm run dev
```

You should see:
```
Server started on port http://localhost:5001
MongoDB connected
```

---

### Terminal 2 — Start the Frontend

```bash
cd bakash
npm run dev
```

You should see:
```
  VITE v8.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

### ✅ Both running? You're ready!

Open your browser at:

```
http://localhost:5173
```

> ⚠️ The backend **must** be running before you click "Pay with bKash", otherwise the payment request will fail.

---

### 🔁 Quick Reference

| Service | Command | URL |
|---|---|---|
| Backend | `cd server && npm run dev` | `http://localhost:5001` |
| Frontend | `cd bakash && npm run dev` | `http://localhost:5173` |

