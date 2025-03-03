# AI Content Generator

A learning project focused on building an AI-powered content generator. This application allows users to generate, view, edit, and delete high-quality content using AI technology. It includes user authentication and integrates with Stripe for payment processing. The project is currently under development and not yet deployed.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)


## Features
- **User Authentication**: Secure login and registration system.
- **Stripe Payment Integration**: Manage subscriptions and payments for different content generation plans.
- **Content Management**: Generate new content, view past content, edit, and delete past histories.
- **Plan Management**: Options for free, basic, and premium plans.

## Tech Stack
### Backend
- **Node.js & Express**: Server-side application framework.
- **MongoDB & Mongoose**: Database and ODM for data storage and management.
- **Google Generative AI API**: For content generation.
- **Stripe API**: For payment processing.
- **JWT & Bcrypt**: For user authentication and password hashing.
- **Nodemon**: Development tool for auto-restarting the server.

### Frontend
- **React**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For client-side routing.
- **Formik & Yup**: For form handling and validation.
- **React Query**: For data fetching and state management.
- **Stripe React SDK**: For integrating Stripe payments.


## Installation
### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ai-content-generator.git
   cd ai-content-generator/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install   
   ```
3. **Start the server:**
   ```bash
   npm run server  
   ```

### Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install   
   ```
3. **Start the development server::**
   ```bash
   npm start app
   ```   


## Environment Variables
Create a `.env` file in the root of the backend and frontend directories and add the following variables:
* **Backend**:

```
NODE_ENV=development 
JWT_SECRET=your_jwt_secret 
GOOGLEAI_API_KEY=your_google_ai_api_key 
STRIPE_SECRET_KEY=your_stripe_secret_key
```

* **Frontend**: You might also need a `.env` file for frontend-specific settings (e.g., API base URL).


## Dependencies
### Backend
- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js.
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai): Google Generative AI API client.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Library for hashing passwords.
- [body-parser](https://www.npmjs.com/package/body-parser): Middleware for parsing incoming request bodies.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Middleware for parsing cookies.
- [cors](https://www.npmjs.com/package/cors): Middleware for enabling CORS.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.
- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [express-async-handler](https://www.npmjs.com/package/express-async-handler): Simple middleware for handling exceptions in async routes.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For generating and verifying JWTs.
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool.
- [node-cron](https://www.npmjs.com/package/node-cron): Task scheduling library.

### Frontend
- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js.
- [@headlessui/react](https://www.npmjs.com/package/@headlessui/react): Unstyled, fully accessible UI components.
- [@heroicons/react](https://www.npmjs.com/package/@heroicons/react): A set of free MIT-licensed high-quality SVG icons.
- [@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js): React components for Stripe.js.
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query): Hooks for fetching, caching, and updating asynchronous data.
- [formik](https://www.npmjs.com/package/formik): Forms in React, without tears.
- [react](https://www.npmjs.com/package/react): JavaScript library for building user interfaces.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): DOM bindings for React Router.
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): A utility-first CSS framework.
- [yup](https://www.npmjs.com/package/yup): JavaScript schema builder for value parsing and validation.

      
## Usage
* **Register/Login**: Create an account or log in using the provided forms.
* **Generate Content**: Input a prompt and let the AI generate content for you.
* **Manage Content**: Access your generated content, edit, or delete it as needed.
* **Subscription Plans**: Upgrade or downgrade your plan to access more features.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure to follow the project's coding standards and include necessary tests.

