CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT CHECK (role IN ('borrower', 'investor', 'admin')) NOT NULL
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    balance NUMERIC DEFAULT 0
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    borrower_id INT REFERENCES users(id),
    amount NUMERIC NOT NULL,
    funded_amount NUMERIC DEFAULT 0,
    interest_rate NUMERIC,
    term_months INT,
    status TEXT CHECK (status IN ('pending', 'funded', 'active', 'closed')) DEFAULT 'pending'
);

CREATE TABLE investments (
    id SERIAL PRIMARY KEY,
    loan_id INT REFERENCES loans(id),
    investor_id INT REFERENCES users(id),
    amount_invested NUMERIC,
    ownership_ratio NUMERIC
);

CREATE TABLE repayments (
    id SERIAL PRIMARY KEY,
    loan_id INT REFERENCES loans(id),
    amount_paid NUMERIC,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger_entries (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    amount NUMERIC,
    type TEXT,
    reference_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- new table to be added

CREATE TABLE emi_schedule (
    id SERIAL PRIMARY KEY,
    loan_id INT REFERENCES loans(id),
    installment_number INT,
    due_date DATE,
    principal_due NUMERIC,
    interest_due NUMERIC,
    total_due NUMERIC,
    status TEXT DEFAULT 'pending'
);

-- new thing 
ALTER TABLE emi_schedule
ADD COLUMN paid_date TIMESTAMP,
ADD COLUMN penalty_applied BOOLEAN DEFAULT FALSE;

CREATE TABLE secondary_market_listings (
    id SERIAL PRIMARY KEY,
    investment_id INT REFERENCES investments(id),
    seller_id INT REFERENCES users(id),
    price NUMERIC NOT NULL,
    status TEXT DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE loans ADD COLUMN credit_score NUMERIC;

-- yet to add 

CREATE TABLE kyc (
    id SERIAL PRIMARY KEY,
    user_id INT,
    document_type TEXT,
    document_number TEXT,
    status TEXT DEFAULT 'pending'
);

CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    loan_id INT REFERENCES loans(id),
    action TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);