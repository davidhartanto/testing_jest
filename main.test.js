

const { Builder, By, Key, until } = require('selenium-webdriver');

describe('TodoMVC React App Tests', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://todomvc.com/examples/react/dist/');
  });

  afterEach(async () => {
    await driver.quit();
  });
  
  test('Positive #1: Add a New Task', async () => { 
    const taskInput = await driver.findElement(By.className('new-todo'));
	const inputText = 'Learn about testing';	
    await taskInput.sendKeys(inputText, Key.ENTER); 

	
    // Verification: Check if the new text is displayed
	const taskLabel2 = await driver.findElement(By.css('.todo-list li label'));
    expect(await taskLabel2.getText()).toEqual(inputText); 
  });  

  test('Positive #2: Mark Task as Complete', async () => { 
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys('Buy groceries', Key.ENTER); 

    const taskCheckbox = await driver.findElement(By.css('.todo-list li .toggle')); 
    await taskCheckbox.click();
	
    // Verification: Check if the task has a 'completed' element
	expect(await driver.wait(until.elementLocated(By.css('.todo-list li.completed')), 5000)); // Timeout after 5 seconds	
	
  });

 test('Positive #3: Edit a Task', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
	const inputText = 'Learn about testing';
	
    await taskInput.sendKeys(inputText, Key.ENTER); 
	
	expect(await driver.wait(until.elementLocated(By.css('.todo-list li label')), 5000)); // Timeout after 5 seconds	

    const taskLabel = await driver.findElement(By.css('.todo-list li label'));
    await driver.actions().doubleClick(taskLabel).perform();

	const editInput = await driver.findElement(By.xpath('/html/body/section/main/ul/li/div/div/input'));

    //Delete current input text
	const total = inputText.length;
        for (let i = 0; i < total; i++) {
            await editInput.sendKeys(Key.BACK_SPACE);
        }	
	
	const inputText2 = 'Learn about automated testing';
    await editInput.sendKeys(inputText2, Key.ENTER); 

    // Verification: Check if the updated text is displayed
	const taskLabel2 = await driver.findElement(By.css('.todo-list li label'));
    expect(await taskLabel2.getText()).toEqual(inputText2); 

  });


test('Positive #4: Delete a Task', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys('Attend important meeting', Key.ENTER); 

    const taskLabel = await driver.findElement(By.css('.todo-list li label'));
    const deleteButton = await taskLabel.findElement(By.xpath('following-sibling::button')); // Assuming delete button is next to the label
    await driver.actions().move({ origin: taskLabel }).perform(); // Hover to reveal the button
    await deleteButton.click(); 

    // Verification: Check that the task element is no longer present 
    const taskElements = await driver.findElements(By.css('.todo-list li'));
    expect(taskElements.length).toEqual(0);  // Or adjust how you verify task absence
});

test('Positive #5: Delete a Completed Task', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys('Attend important meeting', Key.ENTER); 
	
    const taskCheckbox = await driver.findElement(By.css('.todo-list li .toggle')); 
    await taskCheckbox.click();

	const completeButton = await driver.findElement(By.xpath('/html/body/section/footer/button'));
	await completeButton.click();

    // Verification: Check that the task element is no longer present 
    const taskElements = await driver.findElements(By.css('.todo-list li'));
    expect(taskElements.length).toEqual(0);  // Or adjust how you verify task absence
});


test('Negative #1: It is impossible to add Task with Empty Description', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys(Key.ENTER); // Send only an Enter keypress (empty input)

    // Verification: Check there is no any description added
    const taskElements = await driver.findElements(By.css('.todo-list li'));
    expect(taskElements.length).toEqual(0);  // Or adjust how you verify task absence
});

test('Negative #2: Add Task with Excessively Long Description', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    const longDescription = 'a'.repeat(5000); // Create a very long string 
    await taskInput.sendKeys(longDescription, Key.ENTER);

    // Verification: Check if the new text is displayed
	const taskLabel2 = await driver.findElement(By.css('.todo-list li label'));
    expect(await taskLabel2.getText()).toEqual(longDescription); 
});


test('Negative #3: Add task with single quote character', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
	const inputText = "A'";	
    await taskInput.sendKeys(inputText, Key.ENTER); 

	expect(await driver.wait(until.elementLocated(By.css('.todo-list li label')), 5000)); // Timeout after 5 seconds
    // Verification: Check if the updated text is displayed
	const taskLabel2 = await driver.findElement(By.css('.todo-list li label'));
    expect(await taskLabel2.getText()).toEqual(inputText);	
});

test('Negative #4: Add task with double quote character', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
	const inputText = 'A"';	
    await taskInput.sendKeys(inputText, Key.ENTER); 

	expect(await driver.wait(until.elementLocated(By.css('.todo-list li label')), 5000)); // Timeout after 5 seconds
    // Verification: Check if the updated text is displayed
	const taskLabel2 = await driver.findElement(By.css('.todo-list li label'));
    expect(await taskLabel2.getText()).toEqual(inputText);	
});

test('Negative #5: Add task with & character', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
	const inputText = 'A & B';	
    await taskInput.sendKeys(inputText, Key.ENTER); 

	expect(await driver.wait(until.elementLocated(By.css('.todo-list li label')), 5000)); // Timeout after 5 seconds
    // Verification: Check if the updated text is displayed
	const taskLabel2 = await driver.findElement(By.css('.todo-list li label'));
    expect(await taskLabel2.getText()).toEqual(inputText);	
});


});