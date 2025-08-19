from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def home():
    return """
    <html>
    <head><title>Shiv's Portfolio</title></head>
    <body>
            <h1>Welcome to My Portfolio</h1>
            <p>Work in progress...</p>
    </body>
    </html>
    """