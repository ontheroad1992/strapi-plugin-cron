import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import EmptyDocuments from "@strapi/icons/EmptyDocuments";
import React, { useEffect, useState } from "react";
import { cron } from "../../api/cron";
import { CronJobs } from "../../components/CronJobs";

export const HomePage: React.FunctionComponent = () => {
  const [cronJobs, setCronJobs] = useState([]);

  useEffect(() => {
    fetchCronJobs();
  }, []);

  function fetchCronJobs() {
    cron.getAllCronJobs().then((data) => {
      setCronJobs(data);
    });
  }

  return (
    <>
      <BaseHeaderLayout title="Cron Jobs" as="h2" />
      <ContentLayout>
        {cronJobs.length === 0 ? (
          <EmptyStateLayout
            icon={<EmptyDocuments style={{ fontSize: "10rem" }} />}
            content="You don't have any Cron Jobs yet..."
          />
        ) : (
          <CronJobs cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
        )}
      </ContentLayout>
    </>
  );
};

export default HomePage;
