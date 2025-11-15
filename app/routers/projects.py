from fastapi import APIRouter
from data import projects_data



router = APIRouter()

@router.get("/api/projects")
async def projects():
    return projects_data.projects