from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    database_password: str
    database_username: str
    database_hostname: str
    database_port: str
    database_name: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_secret_key: str
    refresh_token_expire_minutes: int

    model_config = SettingsConfigDict(env_file="/home/gareth/Documents/Projects/bloodwork-app/backend/app/.env")

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()