# Chuckie AI

A modern AI chat application built with React and TypeScript.

## Deployment

This project is configured for deployment on Netlify. Follow these steps:

1. Fork/clone this repository
2. Create a new site on Netlify
3. Connect to your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables:
   - `VITE_API_URL` (x.ai API endpoint)
   - `VITE_API_KEY` (your x.ai API key)
6. Deploy!

## Local Development

1. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Features

- Real-time AI chat responses
- Customizable AI response tones
- Dark/Light theme
- Adjustable font sizes
- Markdown support in messages
- Error handling and loading states

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- x.ai API
- Zustand for state management