# Keycloak Custom Theme Setup

This guide will walk you through the process of installing Keycloak and setting up a custom theme for your authentication pages.

## Installation

1. Download and install Keycloak from the [official website](https://www.keycloak.org/downloads).

## Creating a Custom Theme

Once Keycloak is installed, you can create a custom theme by following these steps:

1. Navigate to the Keycloak themes directory in your installation path.

2. Inside the `themes` directory, create a new folder for your custom theme.

3. Within this new folder, add file login.


## Running Keycloak

After setting up your theme, start Keycloak in development mode to enable hot-deploying themes:

```bash
cd bin/
./kc.sh start-dev
```

## Open admin panel

1. Create administrator 

2. Create Realm.

3. Add setting 'Login' in login tab

4. Add setting theme in themes tab 
    - in 'Login theme' select your custom theme

5. In tab manage open 'Clients' 
    - Create client 
      - Add 'Client ID'
      - Add correct redirect url
    