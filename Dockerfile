FROM mcr.microsoft.com/playwright:v1.42.1

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Set environment variables
ENV CI=true

# Run tests
CMD ["npx", "playwright", "test"] 