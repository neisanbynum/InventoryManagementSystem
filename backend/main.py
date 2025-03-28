from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from database import init_db
from routes.auth import auth


app = FastAPI()
app.add_middleware(
	middleware_class=CORSMiddleware,
	allow_origins=[
		'http://localhost:5174',
		'http://localhost:5173',
        'http://10.0.0.252:5173'
	],
	allow_credentials=True,
	allow_methods=['*'],
	allow_headers=['*']
)

@app.get('/test')
def ping():
    return {'message': 'Server Healthy'}

app.include_router(auth)

if __name__ == "__main__":
    init_db()
    uvicorn.run('main:app', host='10.0.0.252', port=8000, log_level='info', reload=True)