import { exec } from "child_process";

console.log("Starting frontend-only portfolio...");

const viteProcess = exec("VITE_HOST=0.0.0.0 npx vite --host 0.0.0.0 --port 5000", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});

viteProcess.stdout?.on("data", (data) => {
  console.log(data.toString());
});

viteProcess.stderr?.on("data", (data) => {
  console.error(data.toString());
});

// Keep the process alive
process.on('SIGINT', () => {
  viteProcess.kill();
  process.exit();
});