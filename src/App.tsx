import { ShorcutKeyProvider } from "./context/ShortcutKeyContext";
import ExampleShortcut from "./features/ExampleShortcut";

const App = () => {
  return (
    <ShorcutKeyProvider>
      <ExampleShortcut />
    </ShorcutKeyProvider>
  );
};

export default App;
