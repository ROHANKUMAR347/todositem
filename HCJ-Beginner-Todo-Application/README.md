<h1 style="color:#397ce7">
HCJ (HTML, CSS, JavaScript)-Todo-Application
</h1>

<h2 style="color:red">
Submission Instructions [Please note]:
</h2>

- The Submission should not contain spaces, for example,/rct-101 folder/eval will not work
- Do not push node_modules and package-lock.json to GitHub

<h2 style="color:red">
Installation:
</h2>

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- Download and unzip the boilerplate file and then copy the "**contents**" of the unzipped file in the Masai Folder.
- Navigate to the Masai Folder, in VS Code.
- Run the following commands inside,
- `npm install --engine-strict`
- <span style="color:red">Do not use `open with live server` to open the page instead use `npm start` command to start the app</span>

<h2 style="color:#397ce7">
Maximum Marks - 15
</h2>

```
✅ able to submit the app - 1 mark ( minimum score )
✅ should able to add a todo and update localStorage - 2 marks
✅ should show error for empty todo text - 1 mark
✅ should show all the todos in the table with archive and toggle status button - 1 mark
✅ should able to toggle status of a todo - 1 mark
✅ should able to add a todo in archive - 2 marks
✅ should show different background color to different priority - 1 mark
✅ should able to show all the archive todos with restore and delete button - 1 mark
✅ should able to restore a archive todo - 2 marks
✅ should able to delete a archive todo - 1 mark
✅ should able to filter archive todos by Priority - 1 mark
✅ should able to filter archive todos by status - 1 mark
```

<h2 style="color:#397ce7">
Folder Structure (Important Files):
</h2>

```
├── archive.html
├── index.html
├── scripts
|  ├── index.js
|  └── archive.js
├── styles
|  ├── archive.css
|  └── index.css
├── package.json
└── README.md
```

<h2 style="color:#397ce7">
Problem Statement:
</h2>

The challenge is to build a todo application, where one can add a todo, add todo in archive and restore the archived todo and delete, filter by priority and status. The application should consist of two main pages:

1. index.html (Landing Page for creating todo)
2. archive.html (for delete and filter archived todo)

<h2 style="color:tomato">
Important Points
</h2>

- <p style="color:tomato">For filtering should be done using in-build javascript filter method.</p>

<h2 style="color:#397ce7">
Navbar (already created no need to create)
</h2>

Navigation bar using `<nav>` tag and show all anchor tags inside nav container with the following links:

| Anchor TextContent | href Link                    |
| ------------------ | ---------------------------- |
| Home               | [index.html](index.html)     |
| Archive            | [archive.html](archive.html) |

<h2 style="color:#397ce7">
1. index.html ( Landing Page)
</h2>

- in this page there are two section one for creating a todo and 2nd one is a table to shoe the added todo dynamically.

- **add todo**

  - one input tag to take the todo name.
  - one select tag to take the priority level.with options `low`, `medium`,`high`.
  - one button with `id=addBtn` to add the todo to localStorage with the key name `todos`. If user click on the button without any text  in input tag a alert will shown with message `Todo cannot be empty!`.

  ```javascript
   structure of data to be stored (array of object)

   [
     {
      title: "example",
      priority: "low",
      status: "Pending🔃" // by default have another option "Completed✅"
     }
     
   ]

  ```
- **table**
   - In the table the todo information should shown as bellow

|    Name      |     Priority    |    Status      |     Delete    |    
| ------------ | --------------- | -------------- |   ----------- |
| show the `title` of the todo | Show the `priority` of the todo and based on the priority of the todo the the background color of the  `td` will change for `low` priority there is no background color, for `medium` priority the background color should be `rgb(255,255,0)` , for `high` priority the background color should be `rgb(255,0,0)` | for showing the status the create a button with `class=toggle` if the status is pending the text content of the button should be `Pending🔃`  and on completed `Completed✅`. on click the button the status should toggle and it should reflect on `page` and `localStorage` both  |   create a button with `class=archiveBtn`and textContent `Archive`, on click the button the todo should remove from `todos` in localStorage and added to localStorage with key name `archive` in a form of array of object (e.g:same as todos) |
 
<figure>
  <img src="https://i.imgur.com/hhrDnty.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">example markup of table row</figcaption>
</figure>
<figure>
  <img src="https://i.imgur.com/JM2aG1t.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">Image.1 - index Page</figcaption>
</figure>
<figure>
  <img src="https://i.imgur.com/ImxCHCd.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">Image.1.1 - index Page alert</figcaption>
</figure>

<h2 style="color:#397ce7">
2. archive.html
</h2>

- On load this page get the archive todos from local storage and show in the table as below format:-  

|     Name      |     Priority    |    Status      |    Restore   |      Delete      |
| ------------- | --------------- | -------------- | ------------ | --------------   |
|  show the `title` of the todo   | Show the `priority` of the todo and based on the priority of the todo the the background color of the  `td` will change for `low` priority there is no background color, for `medium` priority the background color should be `rgb(255,255,0)` , for `high` priority the background color should be `rgb(255,0,0)` | show the `status` of the todo.  |   create a button with `class=restoreBtn` and textContent `Restore`, on click the button the todo should remove from `archive` in localStorage and added to localStorage with key name `todos`.and it should reflect on `page` and `localStorage` both  |  create a button with `class=deleteBtn` and textContent `Delete`, on click the button the todo should remove from `archive` in localStorage and it should reflect on `page` and `localStorage` both   |

- **_filter todos_**
- There are two select tags for filter todos according to `status` and `priority`.
   - select tag with `id=prioritySelect` for selecting the priority , When an option is selected, only todos corresponding to the chosen priority will be displayed on the page.
   - select tag with `id=statusSelect` for selecting the status , When an option is selected, only todos corresponding to the chosen status will be displayed on the page.

<figure>
  <img src="https://i.imgur.com/T60O5N6.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">example markup for table row</figcaption>
</figure>
<figure>
  <img src="https://i.imgur.com/j9JRZpj.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">Image.2 - archive.html</figcaption>
</figure>
<figure>
  <img src="https://i.imgur.com/IxPuRgz.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">Image.3 - archive page with priority select</figcaption>
</figure>
<figure>
  <img src="https://i.imgur.com/eY0aj6Y.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">Image.4 - archive page with status select </figcaption>
</figure>

<h2 style="color:#397ce7">
Tested on cp.masaischool.com
</h2>

<figure>
  <img src="https://i.imgur.com/VohFkqE.png" alt="Image Description" style="width: 100%; border: 1px solid #ccc;">
  <figcaption style="text-align: center; font-weight: bold;">Image.5 - Tested</figcaption>
</figure>

### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes to respond,
- so we request you to read the problem carefully and debug it before itself
- We also request you not just submit it at the last minute
- Try to keep one submission at a time
- If you try to use the VSCodes live server, it won't work. You can use the npm commands provided in this file only.
