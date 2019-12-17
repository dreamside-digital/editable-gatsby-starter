# Editable Gatsby Starter

## Clone the starter repo
  - Set env vars in .env files
  - update package.json with project title and description
  - create Firebase config file at `config/firebase-config.<ENVIRONMENT>.json`

## Set up Firebase services

#### Authentication
  - Go to "Sign-in Providers" and enable Email and Google

#### Realtime database
  - Enable Realtime database and seed the database by importing the file `fixtures/database-seed.json`
  - Update rules as follows:
```
{
  "rules": {
    "pages": {
      ".read": true,
      ".write": "auth != null && root.child('users').child(auth.uid).child('isEditor').val() == true"
    },
    "users": {
      "$user_id": {
        ".write": "$user_id === auth.uid",
        ".read": "$user_id === auth.uid"
      }
    },
  }
}
```
#### Storage
  - Enable storage with directories for `files` and `images`
  - Get service account keys and add to `config/firebase-config.<ENVIRONMENT>.json`

#### Hosting
  - Enable hosting


#### Populate firebase config files
  - Under "Project Settings > General", create a new web app to get the firebase config and add to `config/firebase-config.<ENVIRONMENT>.json`
  - Under "Project Settings > Service Accounts", click "Generate a new private key" and add it to `config/firebase-config.<ENVIRONMENT>.json`

## Add project to less-cms for deployment
  - create separate projects for staging and production



