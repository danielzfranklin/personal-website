t:
    tsc --noEmit
    prettier --check .
    npm run lint
    docker build -t personal-website:latest .

dev:
    npm run dev
