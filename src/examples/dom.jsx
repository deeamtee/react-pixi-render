/** Пример рендера аналогичного ReactDOM */
import logo from "../resources/logo.svg";
import * as ReactDOMMini from "../hostConfigDOM";

const rootNode = document.getElementById("root");
ReactDOMMini.render(<DomExample />, rootNode);

function DomExample() {
  return (
    <div className="example">
      <img className="image" src={logo} alt="" />
      <p>Hello world!</p>
    </div>
  );
}
