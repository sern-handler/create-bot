import { execSync } from "child_process";

try {
    // Check if the global CLI tool is installed
    execSync("sern --version");
    
    console.log("HEALTH: sern cli is installed.");
} catch (error) {
    console.log("HEALTH: sern cli tool not found");
    console.log("Please install our cli with npm install -g @sern/cli");
    process.exit(1)
}
