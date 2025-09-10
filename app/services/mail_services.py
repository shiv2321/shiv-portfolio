from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi import BackgroundTasks
from pydantic import EmailStr

conf = ConnectionConfig(
    MAIL_USERNAME="hahahe840@gmail.com",
    MAIL_PASSWORD="zjcg cejd bqlk fegz ",
    MAIL_FROM="hahahe840@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

fm = FastMail(conf)


async def send_contact_email(background_tasks: BackgroundTasks, name: str, email:EmailStr, message: str):
    """Handles Sending contact from email in the backgrond"""
    msg = MessageSchema(
        subject=f"📩 New Portfolio Contact from {name}",
        recipients=["hahahe840@gmail.com"],
        body=f"Name: {name} \nEmail: {email} \nMessage:{message}",
        subtype="plain"
    )
    background_tasks.add_task(fm.send_message, msg)

