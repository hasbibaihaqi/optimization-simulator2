# ============================================================
# Stage 1: Build React frontend
# ============================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source and build
COPY frontend/ ./
RUN npm run build

# ============================================================
# Stage 2: Python backend + serve frontend via Flask
# ============================================================
FROM python:3.11-slim

# Hugging Face Spaces requires port 7860
EXPOSE 7860

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Copy built frontend into Flask static folder
COPY --from=frontend-builder /app/frontend/dist ./backend/static/

# Set working directory to backend
WORKDIR /app/backend

# Run with gunicorn on port 7860
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "2", "--timeout", "120", "app:app"]
