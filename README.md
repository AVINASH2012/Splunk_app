# Contributing to MyTodoList

## Overview

The project contains a variety of packages that are published and versioned collectively. Each package lives in its own 
directory in the `/packages` directory. Each package is self contained, and defines its dependencies in a package.json file.

We use [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and [Lerna](https://github.com/lerna/lerna) for
managing and publishing multiple packages in the same repository.


## Getting Started

1. Clone the repo.
2. Install yarn (>= 1.2) if you haven't already: `npm install --global yarn`.
3. Run the setup task: `yarn run setup`.

After this step, the following tasks will be available:

* `start` – Run the `start` task for each project
* `build` – Create a production bundle for all projects
* `test` – Run unit tests for each project
* `lint` – Run JS and CSS linters for each project
* `format` – Run prettier to auto-format `*.js`, `*.jsx` and `*.css` files. This command will overwrite files without 
asking, `format:verify` won't.

Running `yarn run setup` once is required to enable all other tasks. The command might take a few minutes to finish.


## Developer Scripts

Commands run from the root directory will be applied to all packages. This is handy when working on multiple packages 
simultaneously. Commands can also be run from individual packages. This may be better for performance and reporting when
 only working on a single package. All of the packages have similar developer scripts, but not all scripts are implemented 
 for every package. See the `package.json` of the package in question to see which scripts are available there.

For more granular control of development scripts, consider using [Lerna](https://github.com/lerna/lerna) directly.


## Code Formatting

MyTodoList uses [prettier](https://github.com/prettier/prettier) to ensure consistent code formatting. It is recommended
 to [add a prettier plugin to your editor/ide](https://github.com/prettier/prettier#editor-integration).
# Splunk_app
# Splunk Custom Solution

This repository contains Python code for building a customized solution using Splunk. The solution includes various components such as data fetching, storage, custom REST APIs, and search functionality.

## Table of Contents

- [Introduction](#introduction)
- [Data Fetching](#DataFetching)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#Project-Structure)
- [API Endpoints](#api-endpoints)
- [Table Rendering](#Table-Rendering)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Introduction

Overview
This Django-React based web application serves as a platform to manage and display Splunk-related information. The application provides functionalities to retrieve, organize, and present data related to Splunk dashboards, descriptions, custom labels, and more.

Data Fetching for react
Uses the useEffect hook to trigger the asynchronous data fetching process upon component mount.
Fetches data from the specified endpoint: http://localhost:8000/servicesNS/description/.
Implements robust error handling, throwing an error if the response status is not OK.
Logs the fetched data to the console for debugging purposes.

Features
Dashboard Overview: Explore a list of available dashboards.
Description List: View and manage descriptions of Splunk objects.
Custom Label Management: Access and modify a list of custom labels.
Search Functionality: Search for specific items based on search terms and stroes search in database.
API Endpoints: Utilize API endpoints for search history, overview data, search history etc.

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/splunk-custom-solution.git

# Navigate to the project directory
cd splunk-custom-solution

# Install dependencies
pip install -r requirements.txt

Access the Application:
Open your web browser for django and go to  http://localhost:8000/.
Open browser for react and go to http://localhost:8000/servicesNS/description/.
```

Project Structure
yourapp/: Contains the Django application code.
templates/: Includes HTML templates for rendering views.
static/: Holds static files like stylesheets and scripts.
react: A fundamental library for building user interfaces with React.
@splunk/react-ui: Splunk UI component library for creating a consistent and visually appealing interface.

API Endpoints
/: Homepage with an overview of available routes.
/overview/: List of available dashboards.
/description/: List and manage descriptions of Splunk objects.
/custom_label_list/: List and manage custom labels.
/description/<str:pk>/: Details of a specific description.
/search/<str:search_term>/: Search for items based on a search term.
/api/search-history/: API endpoint for retrieving search history.
/api/overview/: API endpoint to get overview data.
/post/<str:classification>/: Handles the addition of a new classification

Table Rendering
Utilizes the Splunk UI Table component to structure and present the fetched data.
The table includes a header (Table.Head) with various cells (Table.HeadCell) representing different data attributes.
Dynamically generates table rows (Table.Row) by mapping over the fetched descriptions array.
Displays information such as ID, Name, Description, Owner, Custom Meta Labels, Custom Fields, Type, etc., in the table cells.

##Configuration
1. Database Configuration
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / "db.sqlite3",
    }
}

2. API Keys
If the application interacts with external APIs that require authentication,allow CORS = True.

# settings.py
ORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

3. Add cors in middle ware
MIDDLEWARE = [
"corsheaders.middleware.CorsMiddleware",
]

4. Add cors in Installed apps
INSTALLED_APPS = [
"corsheaders",
]

##Contributing
--Avinash Kumar
