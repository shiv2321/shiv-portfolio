from app.db.database import SessionLocal, engine, Base
from app.models.experience import Experience

Base.metadata.create_all(bind=engine)
db = SessionLocal()

sample = Experience(
    company = "GajShield Infotech Pvt Ltd., Mumbai",
    role = "Jr. Software Developer",
    start_date = "Mar 2025",
    end_date = "Jul 2025",
    description = (
        "• Developed backend modules using Python (web2py) on CentOS-based firewalls.\n"
        "• Automated log parsing pipelines with Python, reducing manual monitoring effort.\n"
        "• Implemented Snort IDS/IPS rules to detect and block malicious IP addresses in real time.\n"
        "• Designed MySQL-backed APIs for secure log access and faster troubleshooting."
    )
)

db.add(sample)
db.commit()
db.close()