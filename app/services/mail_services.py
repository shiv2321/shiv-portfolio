import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi import BackgroundTasks
from pydantic import EmailStr

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=587,
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=os.getenv("MAIL_STARTTLS", "True").lower() == "true",
    MAIL_SSL_TLS=os.getenv("MAIL_SSL_TL", "False").lower() == "true",
    USE_CREDENTIALS=True
)

fm = FastMail(conf)


async def send_contact_email(background_tasks: BackgroundTasks, name: str, email:EmailStr, message: str):
    """Handles Sending contact from email in the backgrond"""
    msg = MessageSchema(
        subject=f"📩 New Portfolio Contact from {name}",
        recipients=[os.getenv("MAIL_USERNAME")],
        body=f"Name: {name} \nEmail: {email} \nMessage:{message}",
        subtype="plain"
    )
    background_tasks.add_task(fm.send_message, msg)

