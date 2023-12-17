# Chatify - Distributed Real-Time Chat Application

Chatify is a simple and scalable distributed real-time chat application built with Node.js, Next.js, Redis, and Turbo Repo.

## Features

- Real-time messaging: Users can join a common chat room and send/receive messages in real-time.
- Distributed architecture: Utilizes multiple Node.js servers and a shared Redis instance for seamless communication and message synchronization.
- Monorepo setup: Managed with Turbo Repo for unified codebase, shared components, and centralized configuration.

## Technologies Used

- **Node.js:** Backend server for handling WebSocket connections and message routing.
- **Next.js:** Frontend framework for building a basic and responsive user interface.
- **Redis:** In-memory data store used as a distributed database and message broker.
- **Turbo Repo:** Monorepo management for unified codebase and shared components.
- **Kafka:** Broker to produce & consume messages in realtime
- **Postgres:** To dump the messages history from broker

## Project Structure

- `/apps/server`: Node.js server handling WebSocket connections.
- `/apps/web`: Next.js application for the user interface.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohantanwar0809/chatify.git
   cd chatify
   ```
