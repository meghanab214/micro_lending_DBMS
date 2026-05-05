from fastapi import FastAPI
from backend.app.routes.investor_routes import router as investor_router
from routes.repayment_routes import router as repayment_router

app = FastAPI()

app.include_router(investor_router)
app.include_router(repayment_router)