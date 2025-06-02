import cron from 'node-cron';
import { config } from '../config/config';
import { SaveExternalNewsPost } from '../Controllers/NewsPostController';

const fetchAndSaveNewsJob = cron.schedule(config.cronSchedule, async () => { //cron job to run every hours
    await SaveExternalNewsPost();
  });

export default fetchAndSaveNewsJob;