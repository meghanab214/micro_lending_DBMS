from fastapi import FastAPI
from backend.app.routes.investor_routes import router as investor_router

app = FastAPI()

app.include_router(investor_router)