from fastapi import FastAPI

from app.routers import results_api

app = FastAPI()

app.include_router(results_api.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
