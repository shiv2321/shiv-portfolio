from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routers import skills, home, projects, contact, experience
from db.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind =engine)

origins = [
    "http://localhost:5173", # The default Vite dev server URL
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(skills.router)
app.include_router(home.router)
app.include_router(projects.router)
app.include_router(contact.router)
app.include_router(experience.router)

