from fastapi import APIRouter, Request, Form, BackgroundTasks
from fastapi.templating import Jinja2Templates
from pydantic import EmailStr, BaseModel
from app.services.mail_services import send_contact_email

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

@router.get("/contact")
async def contact_form(request:Request):
    return templates.TemplateResponse("contact.html", {"request":request})

@router.post("/contact")
async def handle_contact(
    request:Request,
    background_tasks:BackgroundTasks,
    name:str = Form(...),
    email:EmailStr=Form(...),
    message:str=Form(...)
    ):
    await send_contact_email(background_tasks,name,email,message)
    return templates.TemplateResponse("contact.html",{
        "request":request,
        "success":True,
        "name":name
        }
    )
@router.post("/api/contact")
async def handle_api_contact(
    request_data:ContactRequest,
    background_tasks:BackgroundTasks
):
    await send_contact_email(
        background_tasks,
        request_data.name,
        request_data.email,
        request_data.message
    )

    return {
        "success":True,
        "message":"Your message has been sent!"
    }