import type { Metadata } from "next";
import ClickstreamDashboard from "@/clickstream/DashboardPage";

// Only the clickstream project has a dashboard.
export function generateStaticParams() {
  return [{ slug: "ecommerce-clickstream" }];
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Clickstream Funnel",
  description: "110M e-commerce events through an S3, Snowflake, dbt and Airflow pipeline, traced from first view to checkout.",
};

export default function Page() {
  return <ClickstreamDashboard />;
}
