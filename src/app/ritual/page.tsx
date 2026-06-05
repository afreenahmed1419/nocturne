import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "NOCTURNE",
};

export default function RitualPage() {
  redirect("/");
}
