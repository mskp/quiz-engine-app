/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as QuizImport } from './routes/quiz'
import { Route as FinalScoreImport } from './routes/final-score'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const QuizRoute = QuizImport.update({
  path: '/quiz',
  getParentRoute: () => rootRoute,
} as any)

const FinalScoreRoute = FinalScoreImport.update({
  path: '/final-score',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/final-score': {
      id: '/final-score'
      path: '/final-score'
      fullPath: '/final-score'
      preLoaderRoute: typeof FinalScoreImport
      parentRoute: typeof rootRoute
    }
    '/quiz': {
      id: '/quiz'
      path: '/quiz'
      fullPath: '/quiz'
      preLoaderRoute: typeof QuizImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  FinalScoreRoute,
  QuizRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/final-score",
        "/quiz"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/final-score": {
      "filePath": "final-score.tsx"
    },
    "/quiz": {
      "filePath": "quiz.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
