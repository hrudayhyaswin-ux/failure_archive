# Deploying Failure Archive Backend to Hugging Face Spaces

To host your backend on Hugging Face, follow these steps:

### 1. Create a New Space
1. Go to [Hugging Face Spaces](https://huggingface.co/spaces) and click **"Create new Space"**.
2. Give your space a name (e.g., `failure-archive-backend`).
3. Select **"Docker"** as the Space SDK.
4. Choose the **"Blank"** template or any basic Docker template.
5. Set it to **"Public"** (or Private if you prefer).

### 2. Configure Environment Variables
1. In your Space settings, go to **"Variables and secrets"**.
2. Add a new **Secret**:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** (Your OpenAI API Key)

### 3. Push Your Code
You can upload the files directly via the browser or use Git:

#### Option A: Direct Upload
Simply drag and drop the following from your `backend/` folder into the Hugging Face "Files" tab:
- `app/` (the entire folder)
- `Dockerfile`
- `requirements.txt`
- `.env` (Optional, but better to use HF Secrets)

#### Option B: Using Git
```bash
# Initialize git in the backend folder
cd ~/Desktop/failure-archive/backend
git init
git add .
git commit -m "Initial deployment"

# Add the Hugging Face remote (get the URL from your Space's 'Files and versions' tab)
git remote add origin https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME

# Push to Hugging Face
git push -f origin main
```

### 4. Update Frontend
Once deployed, Hugging Face will provide a URL for your Space (e.g., `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`).
- Open `frontend/src/lib/api.ts` and update `API_BASE_URL` to point to your new Hugging Face URL.
- Note: Add `/api` to the end if you want to keep the same routing structure.
