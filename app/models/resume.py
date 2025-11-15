from sqlalchemy import Column, Integer
from db.database import Base

class ResumeDownloads(Base):
    __tablename__ = "resume_downloads"
    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)
    