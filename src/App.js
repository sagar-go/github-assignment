import Context from "./Components/Context";

import Main from "./Components/Main";
import Nav from "./Components/Nav";

function App() {
  return (
    <>
      <Context>
        <Nav />
        <Main />
      </Context>
    </>
  );
}

export default App;
