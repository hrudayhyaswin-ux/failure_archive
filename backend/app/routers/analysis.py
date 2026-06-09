import os
import json
from fastapi import APIRouter, HTTPException
from app import schemas
from openai import OpenAI
from google import genai
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        return None
    return OpenAI(api_key=api_key)

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        return None
    return genai.Client(api_key=api_key)

@router.post("/", response_model=schemas.AIAnalysisResponse)
def analyze_failure(request: schemas.AIAnalysisRequest):
    # Define static fallback response
    fallback_response = {
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

    prompt = f"""
    Analyze the following failure story and provide a structured root cause analysis.
    Story: {request.story}
    
    Return the result in JSON format with the following keys:
    - root_cause_analysis: A dictionary with categories and percentages totaling 100.
    - risk_score: A float from 1 to 10.
    - recommendations: A list of 3 actionable items to avoid this failure.
    """

    # 1. Try Gemini (Free Tier)
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key and gemini_key != "your_api_key_here":
        try:
            client = get_gemini_client()
            response = client.models.generate_content(
                model="gemini-3.5-flash",
                contents=prompt,
                config={
                    'response_mime_type': 'application/json'
                }
            )
            return json.loads(response.text)
        except Exception as e:
            print(f"Gemini error: {e}")

    # 2. Try OpenAI
    openai_key = os.getenv("OPENAI_API_KEY")
    if openai_key and openai_key != "your_api_key_here":
        try:
            client = get_openai_client()
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a professional business failure analyst."},
                    {"role": "user", "content": prompt}
                ],
                response_format={ "type": "json_object" }
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"OpenAI error: {e}")

    # 3. Final Fallback
    return fallback_response
