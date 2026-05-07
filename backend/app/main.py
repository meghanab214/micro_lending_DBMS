from fastapi import FastAPI
from app.routes.investor_routes import router as investor_router
from app.routes.repayment_routes import router as repayment_router
from app.routes.repayment_routes import router as kyc_router

app = FastAPI()

app.include_router(investor_router)
app.include_router(repayment_router)
app.include_router(kyc_router)