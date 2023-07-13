import { Probot } from "probot";

export = (app: Probot) => {
  app.on("workflow_run", async ({ log, payload }) => {
    const { repository, workflow_run } = payload;
    const { conclusion, created_at, name, status, updated_at } = workflow_run;

    if (status === "completed") {
      const duration = Math.ceil(
        (new Date(updated_at).getTime() - new Date(created_at).getTime()) / 1000
      );

      log.debug(repository, "repository");
      log.debug(workflow_run, "workflow_run");
      log.info(
        { conclusion, duration, repository: repository.name, workflow: name },
        "run"
      );
    }
  });
};
