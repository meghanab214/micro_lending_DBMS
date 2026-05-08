# 🚀 Micro-Lending Platform — Frontend

## 📌 Overview

This project is a **Next.js (React) frontend** for a Micro-Lending Platform where:

- Borrowers apply for micro-loans  
- Investors fund loans  
- Repayments are tracked and distributed  
- Investors can trade loan portions  
- Admin manages KYC, compliance, and collections  

The frontend connects to an existing **FastAPI backend**.

---

## 🧱 Tech Stack

- Next.js (React)
- Tailwind CSS
- Axios / Fetch API
- React Context / Zustand (state management)

---

## 🔌 Backend Configuration

Base URL: http://localhost:8000

---

## 📦 Pages to Implement

---

### 🧑‍💼 Borrower Application Portal

**Features:**
- Create loan form:
  - borrower_id
  - amount
  - interest_rate
  - term_months
  - business_id

**API:** POST /create-loan

---

### 📂 Document Uploader

**Features:**
- Input:
  - monthly_revenue
  - payment_history_score
  - social_score

(Simulates MongoDB input)

---

### 📊 Credit Score Dashboard

**Features:**
- Display:
  - credit score
  - loan status

---

### 💰 Investor Marketplace

**Features:**
- List all loans
- Fund loan button

**API:** POST /fund-loan

---

### 📈 Portfolio Manager

**Features:**
- Show investor investments
- Ownership %
- Returns

---

### 💳 Repayment Tracker

**Features:**
- Pay EMI
- Show schedule

**API:** POST /repay

---

### 🔄 Secondary Market

**Features:**
- List investments for sale
- Buy investment

**API:** POST /buy-investment

---

### 🛡️ KYC Verification

**Features:**
- Submit KYC
- Verify KYC

**API:**POST /submit-kyc
POST /verify-kyc

---

### ⚖️ Collections Dashboard

**Features:**
- Show defaulted loans
- Show collection cases
- Update status

---

### 📊 Analytics Dashboard

**Features:**
- Total loans
- Total funded
- Default stats
- Returns

---

## 📁 Project Structure
frontend/
│
├── pages/
│ ├── index.js
│ ├── borrower.js
│ ├── investor.js
│ ├── marketplace.js
│ ├── repayment.js
│ ├── kyc.js
│ ├── collections.js
│
├── components/
│ ├── Navbar.js
│ ├── Sidebar.js
│ ├── LoanCard.js
│ ├── InvestmentCard.js
│
├── services/
│ └── api.js
│
├── styles/
└── utils/


---

## 🔌 API Integration

### `services/api.js`

```javascript
const BASE_URL = "http://localhost:8000";

export const createLoan = async (data) => {
  const res = await fetch(`${BASE_URL}/create-loan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fundLoan = async (data) => {
  const res = await fetch(`${BASE_URL}/fund-loan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const repayLoan = async (data) => {
  const res = await fetch(`${BASE_URL}/repay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};