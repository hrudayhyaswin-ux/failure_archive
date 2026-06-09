from app.database import SessionLocal, engine, Base
from app import models
import os

# Create tables
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Ensure admin user exists
    user = db.query(models.User).filter(models.User.email == "admin@failurearchive.com").first()
    if not user:
        user = models.User(name="Admin", email="admin@failurearchive.com", password_hash="hashed_password", role="admin")
        db.add(user)
        db.commit()
        db.refresh(user)

    # Seed Failures
    failures = [
        {
            "title": "Theranos",
            "category": "Technology",
            "description": "A health technology company that claimed to have devised blood tests that required only very small amounts of blood.",
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
            "description": "A company that manufactured a high-end juicing machine.",
            "industry": "Consumer Goods",
            "year": 2017,
            "failure_reason": "Over-engineering and high price point.",
            "lesson": "Focus on value proposition over complexity.",
            "created_by": user.id
        },
        {
            "title": "FTX",
            "category": "Technology",
            "description": "A major cryptocurrency exchange that collapsed due to financial mismanagement.",
            "industry": "Finance",
            "year": 2022,
            "failure_reason": "Financial fraud and lack of internal controls.",
            "lesson": "Implement strict regulatory oversight and transparency.",
            "created_by": user.id
        },
        {
            "title": "Google Glass",
            "category": "Product",
            "description": "Wearable computer with an optical head-mounted display.",
            "industry": "Technology",
            "year": 2015,
            "failure_reason": "Privacy concerns and lack of clear use case.",
            "lesson": "Address societal concerns and define utility early.",
            "created_by": user.id
        },
        {
            "title": "Blockbuster",
            "category": "Business",
            "description": "A massive video rental chain that failed to adapt to streaming.",
            "industry": "Entertainment",
            "year": 2010,
            "failure_reason": "Failure to adapt to digital transformation.",
            "lesson": "Never ignore disruptive technologies or competitors.",
            "created_by": user.id
        },
        {
            "title": "Segway",
            "category": "Technology",
            "description": "A two-wheeled, self-balancing personal transporter.",
            "industry": "Transportation",
            "year": 2001,
            "failure_reason": "Mismatch between hype and practical infrastructure.",
            "lesson": "Regulatory and infrastructure alignment is key.",
            "created_by": user.id
        },
        {
            "title": "Nokia Mobile",
            "category": "Business",
            "description": "Former leader in mobile phones that failed to transition to smartphones effectively.",
            "industry": "Technology",
            "year": 2013,
            "failure_reason": "Underestimating the shift to software ecosystems (iOS/Android).",
            "lesson": "Continuous innovation and ecosystem building are vital.",
            "created_by": user.id
        },
        {
            "title": "Pets.com",
            "category": "Startup",
            "description": "A dot-com era startup that sold pet supplies online.",
            "industry": "E-commerce",
            "year": 2000,
            "failure_reason": "High burn rate and lack of viable business model.",
            "lesson": "Ensure unit economics work before scaling.",
            "created_by": user.id
        },
        {
            "title": "Kodak",
            "category": "Business",
            "description": "A photography giant that failed to adapt to the digital camera revolution despite inventing it.",
            "industry": "Consumer Goods",
            "year": 2012,
            "failure_reason": "Self-cannibalization fears and slow response to digital trends.",
            "lesson": "Cannibalize yourself before someone else does.",
            "created_by": user.id
        },
        {
            "title": "Webvan",
            "category": "Startup",
            "description": "An online grocery delivery business that collapsed after heavy infrastructure investment.",
            "industry": "E-commerce",
            "year": 2001,
            "failure_reason": "Scaling too fast before proving the model.",
            "lesson": "Get the model right before you build the infrastructure.",
            "created_by": user.id
        },
        {
            "title": "Microsoft Zune",
            "category": "Product",
            "description": "Microsoft's attempt to compete with the iPod that failed to gain significant market share.",
            "industry": "Technology",
            "year": 2011,
            "failure_reason": "Late entry and lack of unique value proposition.",
            "lesson": "Differentiation is key when entering a mature market.",
            "created_by": user.id
        },
        {
            "title": "Amazon Fire Phone",
            "category": "Product",
            "description": "Amazon's first smartphone which was discontinued after poor sales.",
            "industry": "Technology",
            "year": 2015,
            "failure_reason": "Gimmicky features and locked ecosystem.",
            "lesson": "Focus on solve user problems rather than internal ecosystem goals.",
            "created_by": user.id
        }
    ]

    count = 0
    for f_data in failures:
        existing = db.query(models.Failure).filter(models.Failure.title == f_data["title"]).first()
        if not existing:
            f = models.Failure(**f_data)
            db.add(f)
            count += 1
    
    db.commit()
    print(f"Added {count} new failures. Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_data()
