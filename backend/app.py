"""
Evara Events & Weddings — Professional demo backend (FastAPI).

A lead-generation backend: it receives the advanced enquiry form (event type,
date, guest count, budget, etc.) and a newsletter sign-up, and stores both in a
local SQLite database (leads.db). Runs fully offline — no keys or services.

Run:
    pip install -r requirements.txt
    python app.py            # or: uvicorn app:app --reload --port 5001
API:  http://localhost:5001      Docs: http://localhost:5001/docs
"""

import os
import re
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "leads.db")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

app = FastAPI(title="Evara Events API", version="1.0.0")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


def init_db():
    with get_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS leads (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                name        TEXT NOT NULL,
                email       TEXT,
                phone       TEXT NOT NULL,
                event_type  TEXT,
                event_date  TEXT,
                guests      TEXT,
                budget      TEXT,
                message     TEXT NOT NULL,
                source      TEXT,
                created_at  TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS subscribers (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                email      TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()


class LeadIn(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    event_type: str = ""
    event_date: str = ""
    guests: str = ""
    budget: str = ""
    message: str = ""
    source: str = "website"


class SubscribeIn(BaseModel):
    email: str = ""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@app.on_event("startup")
def _startup():
    init_db()


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "evara-events", "time": _now()}


@app.post("/api/enquiry")
def enquiry(p: LeadIn):
    name = p.name.strip()
    email = p.email.strip()
    phone = p.phone.strip()
    message = p.message.strip()

    errors = {}
    if not name:
        errors["name"] = "Please enter your name."
    if not phone:
        errors["phone"] = "Please enter a phone number."
    elif len(re.sub(r"\D", "", phone)) < 7:
        errors["phone"] = "Please enter a valid phone number."
    if email and not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email address."
    if not message:
        errors["message"] = "Please tell us a little about your event."

    if errors:
        return JSONResponse(status_code=400, content={"ok": False, "errors": errors})

    with get_db() as conn:
        cur = conn.execute(
            """INSERT INTO leads
               (name, email, phone, event_type, event_date, guests, budget, message, source, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (name, email, phone, p.event_type.strip(), p.event_date.strip(),
             p.guests.strip(), p.budget.strip(), message, p.source.strip(), _now()),
        )
        conn.commit()
        lead_id = cur.lastrowid

    return JSONResponse(
        status_code=201,
        content={
            "ok": True,
            "id": lead_id,
            "message": "Thank you! Our events team will get back to you within 24 hours.",
        },
    )


@app.post("/api/subscribe")
def subscribe(p: SubscribeIn):
    email = p.email.strip()
    if not EMAIL_RE.match(email):
        return JSONResponse(status_code=400, content={"ok": False, "errors": {"email": "Please enter a valid email."}})
    try:
        with get_db() as conn:
            conn.execute("INSERT INTO subscribers (email, created_at) VALUES (?, ?)", (email, _now()))
            conn.commit()
    except sqlite3.IntegrityError:
        pass  # already subscribed — treat as success
    return {"ok": True, "message": "You're subscribed — thank you!"}


@app.get("/api/leads")
def list_leads():
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM leads ORDER BY id DESC LIMIT 200").fetchall()
    return {"count": len(rows), "leads": [dict(r) for r in rows]}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5001, reload=True)
