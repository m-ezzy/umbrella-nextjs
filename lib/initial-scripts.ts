import colors from 'colors';
import { createDatabase, seedDatabase } from "@/lib/database";

async function initialScripts() {
  console.log('Running initial scripts...'.green);

  // Enable colors for console
  colors.enable();

  // database scripts
  // await createDatabase();
  await seedDatabase();

  console.log('Initial scripts complete.'.green);
}

export default initialScripts;
