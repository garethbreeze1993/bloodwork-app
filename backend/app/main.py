from fastapi import FastAPI

from app.routers import results_api, auth, users

app = FastAPI()

app.include_router(results_api.router)
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
