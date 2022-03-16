import Sidebar from "./Sidebar";
import '../../styles/global.css'

export const Layout = ({children}) =>{
  
  return(
    <div className="App">
      <Sidebar/>
      <main>{children}</main>
    </div>
  );
}
