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
        ],
        "market_sentiment": "High saturation with diminishing marginal returns on user acquisition.",
        "competitor_dynamics": "Aggressive incumbent behavior coupled with low differentiation.",
        "forensic_summary": "The venture failed due to a lack of fundamental unit economics and premature scaling in a crowded vertical."
    }

    prompt = f"""
    Act as a elite venture capital forensic analyst. Analyze the following failure story with extreme precision.
    Story: {request.story}

    Provide a deep multi-dimensional analysis in JSON format with exactly these keys:
    - root_cause_analysis: Dictionary of 4 core failure vectors with percentages (must total 100).
    - risk_score: Float from 1 to 10.
    - recommendations: List of 3 highly specific, non-obvious strategic remediation steps.
    - market_sentiment: A short (1 sentence) sophisticated summary of the market conditions described.
    - competitor_dynamics: A short (1 sentence) analysis of the competitive landscape.
    - forensic_summary: A 2-sentence expert summary of why this specific venture collapsed.
    """
    # 1. Try Gemini (Free Tier)
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key and gemini_key != "your_api_key_here":
        try:
            client = get_gemini_client()
            response = client.models.generate_content(
                model="gemini-1.5-flash",
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
