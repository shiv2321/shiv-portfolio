from fastapi import APIRouter, Request, Form, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

# Simple fake user
FAKE_USER = {"username": "admin", "password": "secret"}

@router.get("/login")
def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@router.post("/login")
def login_post(request: Request, username: str = Form(...), password: str = Form(...)):
    if username == FAKE_USER["username"] and password == FAKE_USER["password"]:
        response = RedirectResponse(url="/skills", status_code=303)
        response.set_cookie(key="is_admin", value="true")
        return response
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/logout")
def logout():
    response = RedirectResponse(url="/skills", status_code=303)
    response.delete_cookie("is_admin")
    return response
