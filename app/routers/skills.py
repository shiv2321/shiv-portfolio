from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.models.db import SkillCategory, get_db
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/skills")
def skills_page(request: Request, db: Session = Depends(get_db)):
    categories = db.query(SkillCategory).all()
    is_admin = request.cookies.get("is_admin") == "true"
    return templates.TemplateResponse(
        "skills.html",
        {"request": request, "categories": categories, "is_admin": is_admin}
    )
