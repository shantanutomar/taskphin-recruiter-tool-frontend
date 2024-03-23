# Taskphin recruiter tool - Frontend

This is the frontend of the Taskphin recruiter tool. The application provides the following functionalities:

-   Show all candidates in a list view
-   Create a new candidate profile with relevent details
-   Update candidate status
-   Delete a candidate
-   Show candidate details

## Description

-   The frontend app is hosted on Netlify and can be accessed [here](https://taskphin-recruiter-tool.netlify.app/).
-   The app is best viewed on desktop right now.
-   The frontend is built using ReactJS with CRA approach along with Typescript.
-   TailwindCSS is used for CSS.
-   Context API is used for state management.

### Dependencies

-   Install node version 20.

### Running in local

-   Make sure the backend is running locally. Follow instructions to how to run the backend
    locally [here](https://github.com/shantanutomar/taskphin-recruiter-tool-backend.git).
-   Once backend is running, clone the [repository](https://github.com/shantanutomar/taskphin-recruiter-tool-frontend.git)
-   Install the dependencies using `npm install`
-   Create a `.env` file in the root directory and add the following environment variables

```
REACT_APP_PROD_API_URL=https://taskphin-recruiter-tool.netlify.app/api
REACT_APP_DEV_API_URL=http://localhost:5001
```

-   Run the app using `npm run start:dev`
-   The app will be running on `http://localhost:3000`

## Authors

Shantanu Tomar
[@shantanutomar](https://www.linkedin.com/in/shantanu-tomar/)
