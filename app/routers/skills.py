from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from app.data import skills_data

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")

@router.get("/skills")
async def skills(request:Request):
    return templates.TemplateResponse("skills.html", {"request":request, "categories":skills_data.skills})

@router.get("/api/skills")
async def skillspage():
    return skills_data.skills