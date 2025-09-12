from fastapi import APIRouter, Request
from app.data import projects_data
from fastapi.templating import Jinja2Templates


router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/projects")
async def projects(request:Request):
    return templates.TemplateResponse(
        "projects.html",{"request":request,"projects":projects_data.projects }
    )