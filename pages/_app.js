import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";
import "../styles/globals.css";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
