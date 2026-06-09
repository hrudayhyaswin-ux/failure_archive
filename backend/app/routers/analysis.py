import os
import json
from fastapi import APIRouter, HTTPException
from app import schemas
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Initialize client lazily or safely
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    return OpenAI(api_key=api_key)

@router.post("/", response_model=schemas.AIAnalysisResponse)
def analyze_failure(request: schemas.AIAnalysisRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # Fallback dummy response if no API key is provided
        return {
            "root_cause_analysis": {
                "Product-Market Fit": 40,
                "Funding": 30,
                "Marketing": 20,
                "Team": 10
            },
            "risk_score": 7.5,
            "recommendations": [
                "Validate demand before scaling",
                "Focus on customer retention",
                "Ensure team alignment on vision"
            ]
        }

    try:
        client = get_openai_client()
        if not client:
             raise HTTPException(status_code=500, detail="OpenAI client not initialized")
             
        prompt = f"""
        Analyze the following failure story and provide a structured root cause analysis.
        Story: {request.story}
        
        Return the result in JSON format with the following keys:
        - root_cause_analysis: A dictionary with categories and percentages totaling 100.
        - risk_score: A float from 1 to 10.
        - recommendations: A list of 3 actionable items to avoid this failure.
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional business failure analyst."},
                {"role": "user", "content": prompt}
            ],
            response_format={ "type": "json_object" }
        )

        analysis_data = json.loads(response.choices[0].message.content)
        return analysis_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
