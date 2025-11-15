from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.experience import Experience

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/experience")
async def get_experience(request:Request,
                     db: Session = Depends(get_db)):
    experiences = db.query(Experience).all()
    return templates.TemplateResponse(
        "experience.html",{
            "request":request,
            "experiences":experiences
        }
    )

@router.get("/api/experience")
async def get_experience_data(db:Session = Depends(get_db)):
    experience = db.query(Experience).all()
    return experience
