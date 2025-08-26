from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from models.db import Base, engine, Skill, SkillCategory, SessionLocal

Base.metadata.create_all(bind=engine)


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request":request})



@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})


@app.get("/skills", response_class=HTMLResponse)
def skills(request: Request, db: Session = Depends(get_db)):
    categories = db.query(SkillCategory).all()
    return templates.TemplateResponse("skills.html", {"request": request, "categories":categories}) 