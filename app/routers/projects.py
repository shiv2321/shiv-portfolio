from fastapi import APIRouter
from app.data import projects_data



router = APIRouter()

@router.get("/api/projects")
async def projects():
    return projects_data.projects