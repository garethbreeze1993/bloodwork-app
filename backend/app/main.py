from fastapi import FastAPI
from fastapi_pagination import add_pagination

from app.routers import results_api, auth, users

app = FastAPI()

app.include_router(results_api.router)
app.include_router(auth.router)
app.include_router(users.router)

add_pagination(app)


@app.get("/")
def read_root():
    return {"Hello": "World"}
