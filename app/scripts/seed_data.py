from db.database import SessionLocal, engine, Base
from models.resume import ResumeDownloads

Base.metadata.create_all(bind=engine)
db = SessionLocal()

if not db.query(ResumeDownloads).first():
    db.add(ResumeDownloads(count=0))
    db.commit()

db.close()