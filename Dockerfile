# Use the official Playwright image (preconfigured with browsers and dependencies)
FROM mcr.microsoft.com/playwright:v1.51.1-noble

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory
WORKDIR /app

# # Install pnpm globally
# RUN npm install -g pnpm

# Copy package manager lockfile and configuration files
COPY pnpm-lock.yaml package.json tsconfig.json ./


# Install Node.js dependencies with pnpm, respecting the lockfile
RUN pnpm install --frozen-lockfile


# Copy the rest of the application source code
COPY src ./src

# Default command to run the application
CMD ["pnpm", "start"]
