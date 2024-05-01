# testing_jest
Automated test developed with jest (node js)

Installation guide:
1. Download and install Google Chrome browser if it does not exist in your local computer
2. Download node.js from this URL https://nodejs.org/en/download/ to your local computer
3. Install the downloaded node.js setup file into your desired folder location or use default location, click Next till it is completed
4. Download the code in this repository as zip file, copy into a designated location in your computer e.g. C:\dev, extract the content so it would be C:\dev\testing_jest-main\ and there is no more subfolder inside
5. Open a command prompt by clicking on window button --> Type: Run --> press Enter --> on the small pop up window key in: cmd --> press Enter
6. A command prompt would show up, navigate it into the designaed folder where the code is residing now, for example if the location is C:\dev then type: cd C:\dev\testing_jest-main
7. Type: dir --> press Enter, you should see readme.md, main.test.js and package.json
8. Type: npm install --> press Enter
9. Type: npm install -g jest@29.7.0 --> press Enter

Running the test:
1. To execute the automated test, type: jest main.test.js --> press Enter
2. A report file: test-report.html wil be created in the folder, this report shows result of the automated test executed earlier

Explanation about the test
This automated test code is an End to End Testing Simulating, it tries to mimic real user interactions with the UI through a browser i.e. clicking elements, filling textbox, and verifying outcomes.
The test scenarios are as below:
Positive #1: Add a New Task: this test scenario is simply adding a new task
Positive #2: Mark Task as Complete: this test scenario covers adding a new task and mark it as complete
Positive #3: Edit a Task: this test scenario covers adding a new task and thereafter edit the task description, the task description should be updated correctly
Positive #4: Delete a Task: this test scenario covers adding a new task and delete it afterwards
Positive #5: Delete a Completed Task: this test scenario covers adding new task, mark it as complete and finally delete it
Negative #1: Add Task with Empty Description: this test scenario is to check whether task with empty description can be created, expecation is: it should not be possible to do it
Negative #2: Add Task with Excessively Long Description: this test scenario is to add a new task with very long character (5000 character of 'a'), expectation: it should be possible
Negative #3: Add task with single quote character: this test scenario to check whether a new task with single quote character in the description can be added and displayed correctly, expecation: if we enter A' it should be displaye as A'
Negative #4: Add task with double quote character: this test scenario to check whether a new task with double quote character in the description can be added and displayed correctly, expecation: if we enter A" it should be displaye as A"
Negative #5: Add task with & character: this test scenario to check whether a new task with "&" character in the description can be added and displayed correctly, expecation: if we enter A & B it should be displaye as A & B

