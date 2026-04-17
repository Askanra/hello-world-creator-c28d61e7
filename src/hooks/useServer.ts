import { useParams } from "react-router-dom";
import { SERVERS, SERVER } from "@/lib/demoData";

export const useServer = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const server = SERVERS.find((s) => s.id === serverId) || SERVER;
  return server;
};

export const useServerBase = () => {
  const { serverId } = useParams<{ serverId: string }>();
  return `/demo/${serverId || SERVER.id}`;
};
