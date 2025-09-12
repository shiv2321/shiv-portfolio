from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer,primary_key=True, index=True)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    description = Column(Text, nullable=False)

