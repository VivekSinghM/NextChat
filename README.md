# NextChat

NextChat is a modern chat application built with Next.js, Supabase, and WebSockets. This repository contains the codebase for a real-time chat application that leverages the power of Next.js for frontend development, Supabase for database management, and WebSockets for seamless real-time communication.

## Features

- **Real-time Messaging**: Enjoy instant communication with other users through WebSockets.
- **User Authentication**: Securely authenticate users with Supabase authentication.
- **Persistent Storage**: Store chat messages and user data reliably using Supabase.
- **Responsive Design**: Utilize Next.js for a responsive and mobile-friendly user interface.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (version >= 14.0.0)
- npm (version >= 7.0.0) or yarn (version >= 1.22.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/NextChat.git
   ```

2. Navigate to the project directory:

   ```bash
   cd NextChat
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

Configuration
Create a Supabase project and obtain the API URL and public key.
Create a .env.local file in the root directory of the project.
Add the following environment variables to the .env.local file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-api-url
NEXT_PUBLIC_SUPABASE_KEY=your-supabase-public-key
```

Usage
Start the development server:

```bash
yarn dev
```

Open your browser and navigate to http://localhost:3000 to view the application.
