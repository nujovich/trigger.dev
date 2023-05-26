import { Outlet } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { PageContainer, PageBody } from "~/components/layout/AppLayout";
import { LinkButton } from "~/components/primitives/Buttons";
import {
  PageHeader,
  PageTitleRow,
  PageTitle,
  PageButtons,
  PageDescription,
  PageInfoRow,
  PageInfoGroup,
} from "~/components/primitives/PageHeader";
import { useCurrentJob } from "~/hooks/useJob";
import { useCurrentOrganization } from "~/hooks/useOrganizations";
import { useCurrentProject } from "~/hooks/useProject";
import { getJob } from "~/models/job.server";
import { requireUserId } from "~/services/session.server";
import { Handle } from "~/utils/handle";
import { testJobPath } from "~/utils/pathBuilder";

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const { jobParam } = params;
  invariant(jobParam, "jobParam not found");

  const job = await getJob({
    userId,
    id: jobParam,
  });

  if (job === null) {
    throw new Response("Not Found", { status: 404 });
  }

  //todo identify job
  // analytics.job.identify({ job });

  return typedjson({
    job,
  });
};

export const handle: Handle = {
  breadcrumb: {
    slug: "job",
  },
};

export default function Job() {
  const organization = useCurrentOrganization();
  const project = useCurrentProject();
  const job = useCurrentJob();
  invariant(organization, "Organization must be defined");
  invariant(project, "Project must be defined");
  invariant(job, "Job must be defined");

  return (
    <PageContainer>
      <PageHeader>
        <PageTitleRow>
          <PageTitle title={job.title} />
          <PageButtons>
            <LinkButton
              to={testJobPath(organization, project, job)}
              variant="primary/small"
              shortcut="T"
            >
              Run Test
            </LinkButton>
          </PageButtons>
        </PageTitleRow>
        <PageInfoRow>
          <PageInfoGroup>Left</PageInfoGroup>
          <PageInfoGroup alignment="right">Test</PageInfoGroup>
        </PageInfoRow>
      </PageHeader>
      <PageBody>
        <Outlet />
      </PageBody>
    </PageContainer>
  );
}
