from fastapi import FastAPI
from app.routes.investor_routes import router as investor_router
from app.routes.repayment_routes import router as repayment_router
from app.routes.kyc_routes import router as kyc_router
from app.routes.loan_routes import router as loan_router
from app.routes.market_routes import router as market_router
from app.routes.collections_routes import router as collections_router
from app.routes.analytics_routes import router as analytics_router

app = FastAPI()

app.include_router(investor_router)
app.include_router(repayment_router)
app.include_router(kyc_router)
app.include_router(loan_router)  
app.include_router(market_router)
app.include_router(collections_router)
app.include_router(analytics_router)