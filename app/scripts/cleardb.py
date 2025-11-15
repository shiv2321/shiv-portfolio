from db.database import SessionLocal, engine, Base
from models.resume import ResumeDownloads

print("Connecting to database...")
Base.metadata.create_all(bind=engine)
db = SessionLocal()

try:
    counter = db.query(ResumeDownloads).first()

    if counter:
        print(f"Old count was: {counter.count}")
        counter.count = 0
        db.commit()
        print("Successfully reset count to 0.")
    else:
        print("No counter found, creating a new one with count 0.")
        db.add(ResumeDownloads(count=0))
        db.commit()

except Exception as e:
    print(f"An error occurred: {e}")
    db.rollback()
finally:
    db.close()
    print("Database connection closed.")