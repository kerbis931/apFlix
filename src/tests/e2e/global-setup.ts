// src/tests/e2e/global-setup.ts
import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function isServerRunning() {
  try {
    const response = await axios.get('http://localhost:3000');
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function globalSetup() {
  const serverRunning = await isServerRunning();

  if (!serverRunning) {
    console.log('Building the application...');
    await execPromise('npm run build');

    console.log('Starting the server...');
    execPromise('npm run start');

    // Wait for the server to be up
    let retries = 5;
    while (retries > 0) {
      const running = await isServerRunning();
      if (running) {
        console.log('Server is up and running');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
      retries--;
    }
    throw new Error('Server failed to start');
  } else {
    console.log('Server is already running');
  }
}

export default globalSetup;
