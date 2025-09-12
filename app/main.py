from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers import skills, home, projects, contact, experience
from app.db.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind =engine)

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(skills.router)
app.include_router(home.router)
app.include_router(projects.router)
app.include_router(contact.router)
app.include_router(experience.router)

