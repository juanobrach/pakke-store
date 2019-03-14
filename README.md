# Pakke store

Built with:
* Node.js v8.9
* React v16
* Redux
* Express
* Babel
* WebPack 4

### Requirements
* Node.js >= 8

## Application Structure

```
.
├── config                   # Project and build configurations
├── dist                     # Distribution folder
├── locales                  # Text files
├── logs                     # Log files
├── public                   # Static public assets and uploads
│   ├── admin                # Dashboard index.html
│   ├── admin-assets         # Dashboard assets
│   └── content              # Store root folder
|
├── scripts                  # Shell scripts for theme install/export
├── src                      # Store Application source code
│   ├── client             # Client side code
│   ├── server             # Server side code
│   └── shared             # Universal code
│   └── index.js             # Server application start point
├── theme                    # Theme as a local package
└── process.json             # pm2 process file
```

## Comands
```
npm i
npm run build
pm2 start process.json
```

## Config

Es necesario configurar el dominio/ip del servidor para la API desde /config/store.js
```
store.js
// config used by store client side only
module.exports = {
	// store UI language
	language: process.env.LANGUAGE || 'es',
	// used by Store (server side)
	apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api/v1',
	// used by Store (server side)
	ajaxBaseUrl: process.env.AJAX_BASE_URL || 'http://localhost:3001/ajax',
	storeListenPort: process.env.STORE_PORT || 3000,
	// key to sign tokens
	jwtSecretKey: process.env.JWT_SECRET_KEY || '-',
	// key to sign store cookies
	cookieSecretKey: process.env.COOKIE_SECRET_KEY || '-'
};
```
