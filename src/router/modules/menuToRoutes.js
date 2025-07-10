// src/router/menuToRoutes.js

// const BASE_PATH = '/admin'


export function convertMenuToRoutes(items) {
  const routes = []

  items.forEach(item => {
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        if (child.view && child.component) {
          routes.push({
            path: normalizePath(child.url),
            name: child.name || child.url,
            component: () => import(
              /* @vite-ignore */ `${child.view}/${child.component}.vue`
            ),
            meta: {
              title: child.title,
              icon: child.icon
            }
          })
        }
      })
    } else if (item.view && item.component) {
      routes.push({
        path: normalizePath(item.url),
        name: item.name || item.url,
        component: () => import(
          /* @vite-ignore */ `${item.view}/${item.component}.vue`
        ),
        meta: {
          title: item.title,
          icon: item.icon
        }
      })
    }
  })

  return routes
}

// Helper function to ensure leading slash
function normalizePath(path) {
  return path?.startsWith('/') ? path : '/' + path
}
