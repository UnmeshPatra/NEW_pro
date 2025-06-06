# BizSetup: Onboarding and Dashboard Solution

BizSetup is a Next.js application designed to provide a smooth onboarding experience for new users and a comprehensive dashboard to manage business-related information. It features a multi-step onboarding process and a dynamic dashboard displaying user data, key metrics, and progress charts. The application also integrates Generative AI capabilities using Genkit for potential future enhancements.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Getting Started

To get the project up and running on your local machine, follow these steps:

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Set up environment variables (if any):**
    If your project requires environment variables (e.g., for API keys), create a `.env.local` file in the root of your project and add them there. Refer to `.env.example` if one is provided.
    *For Genkit and Google AI, ensure you have `GOOGLE_API_KEY` set up if you're using Google AI models.*

4.  **Run the development server:**
    This command starts the Next.js development server.
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json`) in your browser to see the application.

5.  **Run the Genkit development server (for AI features):**
    If you are working with or testing Genkit flows, you'll need to run the Genkit development server in a separate terminal:
    ```bash
    npm run genkit:dev
    ```
    Or for watching changes:
    ```bash
    npm run genkit:watch
    ```
    This typically starts the Genkit development UI on [http://localhost:4000](http://localhost:4000).

## Key Technologies Used

-   **Next.js:** React framework for server-side rendering, static site generation, and more.
-   **React:** JavaScript library for building user interfaces.
-   **TypeScript:** Superset of JavaScript that adds static typing.
-   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
-   **ShadCN UI:** Re-usable UI components built with Radix UI and Tailwind CSS.
-   **Genkit:** Framework for building AI-powered applications, used here for generative AI features.
-   **Zod:** TypeScript-first schema declaration and validation library.
-   **React Hook Form:** For managing form state and validation.

## Project Structure

Here's a brief overview of the main directories:

-   `src/app/`: Contains the main application pages and layouts (using Next.js App Router).
    -   `src/app/page.tsx`: The main onboarding page.
    -   `src/app/dashboard/page.tsx`: The user dashboard page.
    -   `src/app/globals.css`: Global styles and Tailwind CSS theme configuration.
    -   `src/app/layout.tsx`: The root layout for the application.
-   `src/components/`: Reusable React components.
    -   `src/components/ui/`: ShadCN UI components.
    -   `src/components/onboarding/`: Components specific to the onboarding process.
    -   `src/components/dashboard/`: Components specific to the dashboard.
-   `src/ai/`: Contains Genkit related code.
    -   `src/ai/flows/`: Genkit flows for AI functionalities.
    -   `src/ai/genkit.ts`: Genkit initialization and configuration.
    -   `src/ai/dev.ts`: Genkit development server entry point.
-   `src/lib/`: Utility functions and libraries.
    -   `src/lib/onboarding.ts`: Logic for managing onboarding state via localStorage.
    -   `src/lib/utils.ts`: General utility functions (like `cn` for classnames).
-   `src/hooks/`: Custom React hooks.
-   `src/types/`: TypeScript type definitions.
-   `public/`: Static assets.
-   `tailwind.config.ts`: Configuration for Tailwind CSS.
-   `next.config.ts`: Configuration for Next.js.
-   `components.json`: ShadCN UI configuration.
-   `apphosting.yaml`: Firebase App Hosting configuration.

## Available Scripts

In the project directory, you can run the following scripts:

-   `npm run dev`: Runs the app in development mode.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run genkit:watch`: Starts the Genkit development server with file watching.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts a production server (after building).
-   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
-   `npm run typecheck`: Runs TypeScript to check for type errors.

## How to Use the App

1.  **Onboarding:**
    When you first visit the application, you will be guided through a 3-step onboarding process:
    *   **Step 1: Personal Info:** Enter your name and email.
    *   **Step 2: Business Info:** Provide your company name, industry, and size.
    *   **Step 3: Preferences:** Set your theme and default dashboard layout.
    Your progress is saved in localStorage, so you can leave and come back.

2.  **Dashboard:**
    After completing onboarding, you will be redirected to the dashboard. The dashboard displays:
    *   Your user information.
    *   Key metrics like team members, active projects, and notifications (currently generated randomly for demonstration).
    *   A weekly progress chart (also with randomly generated data).
    You can reset the onboarding process from the dashboard to go through it again.

## Deployment

This project is configured for deployment using **Firebase App Hosting**. The `apphosting.yaml` file contains the basic configuration for this.

To deploy:
1.  Ensure you have the Firebase CLI installed and configured.
2.  Connect your Firebase project.
3.  Run the Firebase deployment command: `firebase deploy --only hosting` (or the specific command for App Hosting if it differs).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

---

This README provides a good starting point for understanding, running, and contributing to the BizSetup project.
