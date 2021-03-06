# Fortgeschrittene Webentwicklung - Homework 2
As part of the course 'Fortgeschrittene Webentwicklung' we had to create a timetracker application. In this first homework I developed a frontend page for this application.

## General informations

* Frontend can be reached on http://localhost:80
* Fixtures can be inserted with `docker-compose exec backend npm run fixtures`

## Functionality

### Dashboard
![dashboard.png](./doc/dashboard.png "dashboard")
<details>
<summary>1. Change filter</summary>
Click here to change the filter. The following modal will come up:
<br>
<img  src="doc/filter.png"></img>
</details>
<details>
<summary>2. Create label</summary>
Click here to create a label. The following modal will come up:
<br>
<img  src="doc/addLabel.png"></img>
</details>
<details>
<summary>3. Delete label</summary>
Click here to delete a filter. The following modal will come up:
<br>
<img  src="doc/deleteLabel.png"></img>
</details>
<details>
<summary>4. Plus</summary>
Click here to create a task. The following modal will come up:
<br>
<img  src="doc/addTask.png"></img>
</details>
<details>
<summary>5. Labellist</summary>
Here are all available labels listed.
</details>
<details>
<summary>6. Task item</summary>
Click here to visit the task detail site.
</details>
<details>
<summary>7. Start timer</summary>
Click here to start a new tracking of a specific task. The following dialog will come up:
<img  src="doc/startTracking.png"></img><br>
1. Click here to pause/ unpause the tracking<br>
2. Click here to stop the tracking<br>
</details>
<details>
<summary>8. Trash</summary>
Click here to delete a specific task
</details>
<br>

### Task detail site
![taskDetailSite.png](./doc/taskDetailSite.png "task detail site")
<details>
<summary>1. Add label</summary>
Click here to add a label to the task. The following modal will come up:
<br>
<img  src="doc/addLabelToTask.png"></img>
</details>
<details>
<summary>2. Delete label</summary>
Click here to delete a label from the task. The following modal will come up:
<br>
<img  src="doc/deleteLabelFromTask.png"></img>
</details>
<details>
<summary>3. Edit</summary>
Click here to edit the task. The following modal will come up:
<br>
<img  src="doc/editTask.png"></img>
</details>
<details>
<summary>4. Plus</summary>
Click here to add a tracking to the task. The following modal will come up:
<br>
<img  src="doc/addTracking.png"></img>
</details>
<details>
<summary>5. Edit tracking</summary>
Click here to edit a tracking. The following modal will come up:
<br>
![editTracking.png](./doc/editTracking.png "edit tracking")
</details>
<details>
<summary>6. Trash</summary>
Click here to delete a tracking
</details>

## Testing
The frontend tests are based on the react testing library.

### Unit/ Integration tests 
To execute the Unit/ Integration tests execute the following command on a command prompt:<br>
`docker-compose exec frontend npm run test`.<br>

### E2E tests
When you will run your E2E tests the first time you have to navigate to `app/cypress` and run the following command: `npm install`<br>
1. You have to delete all task items and labels in the frontend, so that it is totaly clear<br>
2. After that you can start cypress using the following command in the `app/cypress` folder: `npm run cypress`<br>
Sometimes the tests are running only after a second attempt.<br>
The results from the tests should look like this:<br>
![e2eTestResults.png](./doc/e2eTestResults.png "E2E test results")

## License
**The MIT License (MIT)**

Copyright © 2020 Eliah Vogel