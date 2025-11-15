from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse, JSONResponse
import os
from sqlalchemy.orm import Session
from db.database import get_db
from models.resume import ResumeDownloads

router = APIRouter()

templates = Jinja2Templates(directory="templates")


@router.get("/")
async def home(request:Request, db: Session = Depends(get_db)):
    record = db.query(ResumeDownloads).first()
    return templates.TemplateResponse("home.html", {"request":request, "counter":record.count if record else 0})

@router.get("/api/download_resume")
async def download_resume():
    file_path = os.path.join("static", "shiv_resume.pdf")
    return FileResponse(
        path=file_path,
        filename="Shiv_resume.pdf",
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="Shiv_resume.pdf"'}
    )

@router.get("/api/counter")
async def get_counter(db : Session = Depends(get_db)):
    record = db.query(ResumeDownloads).first()
    return {"count":record.count if record else 0}

@router.post("/api/increase_count")
async def increseCount(db: Session = Depends(get_db)):
    record = db.query(ResumeDownloads).first()
    if record:
        record.count +=1
    else:
        record = ResumeDownloads(count = 1)
        db.add(record)
    db.commit()
    return {"count":record.count}