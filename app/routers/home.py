from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse, JSONResponse
import os
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.resume import ResumeDownloads

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/")
async def home(request:Request, db: Session = Depends(get_db)):
    record = db.query(ResumeDownloads).first()
    return templates.TemplateResponse("home.html", {"request":request, "counter":record.count if record else 0})

@router.get("/download_resume")
async def download_resume(db:Session=Depends(get_db)):
    record = db.query(ResumeDownloads).first()
    if record:
        record.count +=1
    else:
        record = ResumeDownloads(count = 1)
        db.add(record)
    db.commit()
    file_path = os.path.join("app", "static", "shiv_resume.pdf")
    return FileResponse(
        path=file_path,
        filename="Shiv_resume.pdf",
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="Shiv_resume.pdf"'}
    )

@router.get("/counter")
async def get_counter(db : Session = Depends(get_db)):
    record = db.query(ResumeDownloads).first()
    return JSONResponse({"counter":record.count if record else 0})