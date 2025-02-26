# Notes

-   split tools into categories
-   each category will be a dropdown menu in the sidebar
-   general settings dropdown i.e. theme mode toggle, request a tool, report a problem etc.

-   \*\* possible ad page for revenue?

&nbsp;

# Tools so far

1. password generator
2. notepad
3. link in bio w/ preview page - (ref: linktree)
4. url shortener
5. pomodoro timer
6. file converter
7. calendar?

&nbsp;

# Remove the above when done

&nbsp;

&nbsp;

&nbsp;

# Process of adding to the file structure

> ### Adding navigation to sidebar

1. Navigate to components/global/app-sidebar-item-list.tsx
2. Find the correct category
3. Add a new object to the end of the items array with the following values: title, url and icon

&nbsp;

> ### Adding a new Next.js route

1. Create a new folder in the app directory

    ```

    Name of folder needs to be all lower case and use the kebab case naming convention ( e.g. new-folder-name )

    ```

2. Add a file called page.tsx to the newly created folder
3. Add all jsx content to the page.tsx

&nbsp;

> ### Adding components related to a specific tool

1. Navigate to the components root folder
2. Find the folder with the same name as the tool, if there is no folder specified then create one using the same name

    ```
    route: new-folder-name

    componentFolder: new-folder-name
    ```

3. Add all necessary components to the newly added folder

&nbsp;

> ### Adding hooks

1. Navigate to the hooks root folder
2. Find the folder with the same name as the tool, if there is no folder specified then create one using the same name

    ```
    route: new-folder-name

    hooksFolder: new-folder-name
    ```

3. Add all necessary hooks to the newly added folder


&nbsp;

> ### Global folders ( components & hooks )

1. There are global folders available for use, these should only be used when either a component or hook is applied across multiple tools or the entire application

&nbsp;

&nbsp;

&nbsp;

# If you have any questions, get in touch with the project maintainer [here](https://discordapp.com/users/706100204960612443)