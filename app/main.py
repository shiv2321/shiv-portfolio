from fastapi import FastAPI, Request, Form, BackgroundTasks
from pydantic import EmailStr
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from app.data import skills_data, projects_data
from app.services.mail_services import send_contact_email

import os
#from app.routers import skills, admin

app = FastAPI()


# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")


templates = Jinja2Templates(directory="app/templates")


counter = 0

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("home.html", {"request":request, "counter":counter})

@app.get("/skills")
def skills(request: Request):
    return templates.TemplateResponse("skills.html", {"request":request, "categories":skills_data.skills})


@app.get("/download_resume")
async def download_resume():
    file_path = os.path.join("app", "static", "shiv_resume.pdf")
    global counter 
    counter += 1
    return FileResponse(
        path=file_path,
        filename="Shiv_Resume.pdf",
        media_type="application/pdf",
        headers={
            "Content-Disposition": 'attachment; filename="Shiv_Resume.pdf"'
        }
    )

@app.get("/counter")
def get_counter():
    return JSONResponse({"counter":counter})

@app.get("/projects")
def projects(request:Request):
    return templates.TemplateResponse(
        "projects.html",{"request":request,"projects":projects_data.projects }
    )

@app.get("/contact")
def contact_form(request:Request):
    return templates.TemplateResponse("contact.html",{"request":request})

@app.post("/contact")
async def handle_contact(request:Request,
                   background_tasks:BackgroundTasks, 
                   name: str = Form(...), 
                   email: EmailStr = Form(...), 
                   message:str = Form(...)):
    await send_contact_email(background_tasks, name, email, message)
    return templates.TemplateResponse("contact.html",{
        "request":request,
        "success":True,
        "name":name
    })