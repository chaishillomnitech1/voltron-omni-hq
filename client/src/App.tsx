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
import ScrollVerseGuardians from "./pages/ScrollVerseGuardians";
import ScrollVerseCommunity from "./pages/ScrollVerseCommunity";
import GuardianCertificationQuiz from "./pages/GuardianCertificationQuiz";
import ScrollVerseAnalytics from "./pages/ScrollVerseAnalytics";
import SaferwayShowcase from "./pages/SaferwayShowcase";
import SaferwayGreatDetail from "./pages/SaferwayGreatDetail";
import DetailingServices from "./pages/DetailingServices";
import AuctionOutlets from "./pages/AuctionOutlets";
import CarRentalOutlets from "./pages/CarRentalOutlets";
import SaferwayAdminDashboard from "./pages/SaferwayAdminDashboard";
import SaferwayAIChat from "./components/SaferwayAIChat";
import WalletConnector from "./components/WalletConnector";
import AdminAnalyticsDashboard from "./pages/AdminAnalyticsDashboard";
import ReferralAffiliate from "./pages/ReferralAffiliate";
import AdminControlPanel from "./pages/AdminControlPanel";
import PhysicalManifestationDashboard from "./pages/PhysicalManifestationDashboard";
import DivineWisdomPortal from "./pages/DivineWisdomPortal";
import MarsOmniBroadcasting from "./pages/MarsOmniBroadcasting";
import SacredBooksGallery from "./pages/SacredBooksGallery";
import GuardianTierProgression from "./pages/GuardianTierProgression";
import ScrollVersePortalMatrix from "./pages/ScrollVersePortalMatrix";
import DecentralizedMinting from "./pages/DecentralizedMinting";
import AILegion from "./pages/AILegion";
import BlockchainMonitoring from "./pages/BlockchainMonitoring";
import GovernanceDAO from "./pages/GovernanceDAO";
import GlobalDistribution from "./pages/GlobalDistribution";
import MobileGovernance from "./pages/MobileGovernance";
import ExchangeDashboard from "./pages/ExchangeDashboard";
import TokenLauncher from "./pages/TokenLauncher";
import ZaireWallet from "./pages/ZaireWallet";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/nft-minting"} component={NFTMinting} />
      <Route path={"/dao-governance"} component={DAOGovernance} />
      <Route path={"/vibe-engine"} component={VibeEngine} />
      <Route path={"/assets"} component={AssetDashboard} />
      <Route path={"/scrollverse"} component={ScrollVerse} />
      <Route path={"/scrollverse/metrics"} component={ScrollVerseMetrics} />
      <Route path={"/scrollverse/guardians"} component={ScrollVerseGuardians} />
      <Route path={"/scrollverse/community"} component={ScrollVerseCommunity} />
      <Route path={"/scrollverse/certification"} component={GuardianCertificationQuiz} />
      <Route path={"/scrollverse/analytics"} component={ScrollVerseAnalytics} />
      <Route path={"/saferway"} component={SaferwayShowcase} />
      <Route path={"/saferway-detail"} component={SaferwayGreatDetail} />
      <Route path={"/detailing"} component={DetailingServices} />
      <Route path={"/auctions"} component={AuctionOutlets} />
      <Route path={"/rentals"} component={CarRentalOutlets} />
      <Route path={"/admin"} component={SaferwayAdminDashboard} />
      <Route path={"/wallets"} component={WalletConnector} />
      <Route path={"/analytics"} component={AdminAnalyticsDashboard} />
       <Route path="/referral" component={ReferralAffiliate} />
      <Route path="/control-panel" component={AdminControlPanel} />
      <Route path="/manifestation" component={PhysicalManifestationDashboard} />
      <Route path="/divine-wisdom" component={DivineWisdomPortal} />
      <Route path="/marsomni-broadcasting" component={MarsOmniBroadcasting} />
      <Route path="/sacred-books" component={SacredBooksGallery} />
      <Route path="/guardian-progression" component={GuardianTierProgression} />
      <Route path="/scrollverse-portal" component={ScrollVersePortalMatrix} />
      <Route path="/decentralized-minting" component={DecentralizedMinting} />
      <Route path="/ai-legion" component={AILegion} />
      <Route path="/blockchain-monitoring" component={BlockchainMonitoring} />
      <Route path="/governance-dao" component={GovernanceDAO} />
      <Route path="/global-distribution" component={GlobalDistribution} />
      <Route path="/mobile-governance" component={MobileGovernance} />
      <Route path="/exchange" component={ExchangeDashboard} />
      <Route path="/token-launcher" component={TokenLauncher} />
      <Route path="/zaire-wallet" component={ZaireWallet} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    <SaferwayAIChat />
    </>
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
