import colors from 'colors';
// import { seedDatabase } from "@/lib/db";

async function initialScripts() {
  // console.log('Running initial scripts...'.green);

  // Enable colors for console
  colors.enable();

  // database scripts
  // await seedDatabase();

  console.log('Initial scripts complete.'.green);
}

export default initialScripts;
