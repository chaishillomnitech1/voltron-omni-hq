import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NFTMinting from "./pages/NFTMinting";
import DAOGovernance from "./pages/DAOGovernance";
import VibeEngine from "./pages/VibeEngine";
import AssetDashboard from "./pages/AssetDashboard";
import ScrollVerse from "./pages/ScrollVerse";
import ScrollVerseMetrics from "./pages/ScrollVerseMetrics";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/nft-minting"} component={NFTMinting} />
      <Route path={"/dao-governance"} component={DAOGovernance} />
      <Route path={"/vibe-engine"} component={VibeEngine} />
      <Route path={"/assets"} component={AssetDashboard} />
      <Route path={"/scrollverse"} component={ScrollVerse} />
      <Route path={"/scrollverse/metrics"} component={ScrollVerseMetrics} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
