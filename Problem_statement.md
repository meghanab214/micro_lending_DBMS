##Problem statement

Problem: Micro-lending Platform for Small Businesses 
Domain: FinTech -Tech: PostgreSQL + MongoDB + Redis + React/Next.js 
Problem Statement: Build a peer-to-peer lending platform where small businesses can apply for microloans, and investors can fund portions of loans with automated repayment distribution. 
Database Requirements: 
• SQL (BCNF): Loan applications, investor accounts, repayments, interest calculations, credit scores 
• MongoDB: Business documents (financial statements, business plans), alternative credit data (social media, payment history) 
• ACID: All financial transactions must be atomic and durable

Functional Requirements:
•
Loan application with dynamic document requirements per loan type
•
Automated credit scoring using traditional + alternative data
•
Investor dashboard with portfolio diversification recommendations
•
Automated repayment distribution to multiple investors
•
Late payment penalties and collections workflow
•
Secondary market for selling loan portions
•
Regulatory compliance (KYC, AML) integration


Frontend Pages : Borrower Application Portal, Document Uploader, Credit Score Dashboard, Investor Marketplace, Portfolio Manager, Repayment Tracker, Secondary Market Trading, Admin Compliance Panel, Collections Dashboard, Analytics Dashboard, KYC Verification, Dispute Resolution


Unique Challenge: Implementing ACID transactions for fractional loan ownership and repayment distribution