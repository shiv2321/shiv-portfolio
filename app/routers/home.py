from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse, JSONResponse
import os

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")

counter = 0 

@router.get("/")
async def home(request:Request):
    return templates.TemplateResponse("home.html", {"request":request, "counter":counter})

@router.get("/download_resume")
async def download_resume():
    global counter
    counter += 1
    file_path = os.path.join("app", "static", "shiv_resume.pdf")
    return FileResponse(
        path=file_path,
        filename="Shiv_resume.pdf",
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="Shiv_resume.pdf"'}
    )

@router.get("/counter")
async def get_counter():
    return JSONResponse({"counter":counter})