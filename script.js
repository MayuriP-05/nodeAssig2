const fs = require('fs');
const path = require('path');
const readline = require('readline');


const filePath = path.join(__dirname, 'Mayuri.txt');


if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8');
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function showMenu() {
    console.log('\nTask Manager');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit\n');
    rl.question('Choose an option: ', handleUserInput);
}


function handleUserInput(option) {
    switch (option.trim()) {
        case '1':
            rl.question('Enter the new task: ', addTask);
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            rl.question('Enter the task number to mark as complete: ', markTaskComplete);
            break;
        case '4':
            rl.question('Enter the task number to remove: ', removeTask);
            break;
        case '5':
            console.log('Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please try again.');
            showMenu();
    }
}


function addTask(task) {
    if (task.trim()) {
        fs.appendFileSync(filePath, `${task.trim()}|incomplete\n`, 'utf8');
        console.log('Task added successfully.');
    } else {
        console.log('Task cannot be empty.');
    }
    showMenu();
}


function viewTasks() {
    const tasks = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        tasks.forEach((task, index) => {
            const [taskName, status] = task.split('|');
            console.log(`${index + 1}. [${status}] ${taskName}`);
        });
    }
    showMenu();
}


function markTaskComplete(taskNumber) {
    const tasks = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
    const index = parseInt(taskNumber.trim()) - 1;

    if (index >= 0 && index < tasks.length) {
        const [taskName, status] = tasks[index].split('|');
        tasks[index] = `${taskName}|complete`;
        fs.writeFileSync(filePath, tasks.join('\n'), 'utf8');
        console.log('Task marked as complete.');
    } else {
        console.log('Invalid task number.');
    }
    showMenu();
}


function removeTask(taskNumber) {
    const tasks = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
    const index = parseInt(taskNumber.trim()) - 1;

    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        fs.writeFileSync(filePath, tasks.join('\n'), 'utf8');
        console.log('Task removed successfully.');
    } else {
        console.log('Invalid task number.');
    }
    showMenu();
}


showMenu();