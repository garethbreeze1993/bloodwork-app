from fastapi import FastAPI
from fastapi_pagination import add_pagination
from fastapi.middleware.cors import CORSMiddleware

from app.routers import results_api, auth, users


origins = ['*']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(results_api.router)
app.include_router(auth.router)
app.include_router(users.router)



add_pagination(app)


@app.get("/")
def read_root():
    return {"Hello": "World"}
