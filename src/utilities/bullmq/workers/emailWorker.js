import emailCancelRequest from "../jobs/emailCancelRequest";
import { Worker } from "bullmq";
import { redisConfiguration } from "@/utilities/redis";

const emailWorkerJob = async (job) => {
  switch (job.name) {
    case "emailCancelRequest":
      await emailCancelRequest(job.data);
      break;
    default:
      console.log(`Email Job: ${job.id} processed. No email sent.`);
  }
};

const emailWorker = new Worker("emailSchedule", emailWorkerJob, {
  connection: redisConfiguration
});

emailWorker.on("completed", (job) => {
  console.info(`Email Job id: ${job.id} has completed!`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Email Job id: ${job.id} has failed with ${err.message}`);
});

export default emailWorker;
