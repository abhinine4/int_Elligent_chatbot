#!/usr/bin/env python
# coding: utf-8

import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

sys.path.append(".")
from .routes.query import router as Query

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return "int-Elligent Chatbot"


app.include_router(Query, tags=["Query"], prefix="/query")

