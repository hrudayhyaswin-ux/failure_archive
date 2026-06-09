from app.database import SessionLocal, engine, Base
from app import models

# Create tables
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Check if we already have data
    if db.query(models.Failure).first():
        print("Database already seeded.")
        return

    # Create a dummy user
    user = models.User(name="Admin", email="admin@failurearchive.com", password_hash="hashed_password", role="admin")
    db.add(user)
    db.commit()
    db.refresh(user)

    # Seed Failures
    failures = [
        {
            "title": "Theranos",
            "category": "Technology",
            "description": "A health technology company that claimed to have devised blood tests that required only very small amounts of blood and could be performed very rapidly using small automated devices.",
            "industry": "Healthcare",
            "year": 2018,
            "failure_reason": "Fraud and lack of scientific validation.",
            "lesson": "Verify claims and encourage transparency.",
            "created_by": user.id
        },
        {
            "title": "Quibi",
            "category": "Startup",
            "description": "A short-form streaming platform designed for mobile viewing.",
            "industry": "Entertainment",
            "year": 2020,
            "failure_reason": "Poor product-market fit and timing.",
            "lesson": "Understand user behavior before heavy investment.",
            "created_by": user.id
        },
        {
            "title": "Juicero",
            "category": "Product",
            "description": "A company that manufactured a juicing machine which used proprietary packets of chopped fruits and vegetables.",
            "industry": "Consumer Goods",
            "year": 2017,
            "failure_reason": "Over-engineering and high price point.",
            "lesson": "Focus on value proposition over complexity.",
            "created_by": user.id
        }
    ]

    for f_data in failures:
        f = models.Failure(**f_data)
        db.add(f)
    
    db.commit()
    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_data()
