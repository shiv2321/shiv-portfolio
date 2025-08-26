from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import relationship, declarative_base, sessionmaker

Base = declarative_base()

DATABASE_URL = "sqlite:///./skills.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread":False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class SkillCategory(Base):
    __tablename__ = "skill_categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

    skills = relationship("Skill", back_populates="category")


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category_id = Column(Integer, ForeignKey("skill_categories.id"))

    category = relationship("SkillCategory", back_populates="skills")   