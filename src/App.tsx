import './App.module.scss';
import UMLDiagramGenerator from './components/graphGenerator/graphGenerator';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  const graphWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Header />
      <div id="graphWrapper" style={graphWrapperStyle}>
        <UMLDiagramGenerator />
      </div>
      <Footer />
    </>
  );
}

export default App;
