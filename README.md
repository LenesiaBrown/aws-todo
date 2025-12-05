## A simple and secure cloud-connected to-do list web application built with **React**, **AWS Amplify**, **Amazon Cognito**, and **DynamoDB**.

This app was created to learn core full-stack cloud skills including:
- User authentication (Sign-Up, Sign-In, Email Confirmation) with Cognito
- Cloud-hosted backend using Amplify + GraphQL API
- Persistent data storage in DynamoDB
- Custom-styled authentication UI using regular CSS
- To-do list UI styled with Tailwind CSS
- Deployed frontend using Vercel


## Tech Stack

| Layer            | Technology                                      |
|------------------|--------------------------------------------------|
| Frontend         | React (Vite)                                   |
| Styling          | Custom CSS (Auth UI), Tailwind CSS (To-do UI)  |
| Auth             | AWS Amplify + Amazon Cognito                   |
| API / Backend    | AWS Amplify GraphQL API                        |
| Database         | Amazon DynamoDB                                |
| Frontend Hosting | Vercel (S3 + CloudFront planned next)          |
| Version Control  | Git + GitHub                                   |














# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
