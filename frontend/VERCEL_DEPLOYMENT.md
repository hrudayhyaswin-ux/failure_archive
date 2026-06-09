# Deploying Failure Archive Frontend to Vercel

To host your frontend on Vercel and make it accessible to everyone, follow these steps:

### 1. Push Your Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Follow the instructions to push your frontend code:
   ```bash
   cd ~/Desktop/failure-archive/frontend
   git init
   git add .
   git commit -m "Initial frontend deployment"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### 2. Connect to Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
2. Import your GitHub repository.

### 3. Configure Environment Variables
1. During the "Configure Project" step, look for the **"Environment Variables"** section.
2. Add the following variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://YOUR_HF_USERNAME-YOUR_HF_SPACE_NAME.hf.space/api`
     *(This is the URL of your backend running on Hugging Face Spaces)*

### 4. Deploy
1. Click **"Deploy"**.
2. Once finished, Vercel will provide you with a public link (e.g., `https://failure-archive.vercel.app`).

### 5. Final Check
- Your website is now live! Anyone with the Vercel link can access it.
- Ensure your Hugging Face Space is "Running" so the frontend can fetch data.
