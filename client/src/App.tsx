/* Design reminder: keep the global shell scene-based and never introduce a long-scroll course layout. */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { ModuleRoute } from "./pages/ModulePage";

function Router() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <WouterRouter base={base === "/" ? "" : base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/modulo/prompts"><ModuleRoute moduleKey="prompts" /></Route>
        <Route path="/modulo/artes"><ModuleRoute moduleKey="artes" /></Route>
        <Route path="/modulo/sites"><ModuleRoute moduleKey="sites" /></Route>
        <Route path="/modulo/dia-a-dia"><ModuleRoute moduleKey="dia-a-dia" /></Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
