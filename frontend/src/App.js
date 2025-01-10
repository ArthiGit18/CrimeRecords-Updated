import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from '../src/components/Main'
import Search from './pages/CriminalRecords/Search';
import Infamous from './pages/CriminalRecords/Infamous';
import TopWanted from './pages/CriminalRecords/TopWanted';
import ColdCases from './pages/UnsolvedMysteries/ColdCases';
import MissingPerson from './pages/UnsolvedMysteries/MissingPersons';
import ForensicWork from './pages/ForensicFiles/ForensicWork';
import ForensicCases from './pages/ForensicFiles/ForensicCases';
import Loading from './common/404Loading';
import DetailView from './common/DetailView';
import Payment from './common/Payment';


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/search" element={<Search />} />
      <Route path="/infamousCriminals" element={<Infamous />} />
      <Route path="/topWanted" element={<TopWanted />} />
      <Route path="/colsCases" element={<ColdCases />} />
      <Route path="/missingPerson" element={<MissingPerson />} />
      <Route path="/forensicWork" element={<ForensicWork />} />
      <Route path="/forensicCases" element={<ForensicCases />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/payment/:_id" element={<Payment />} />
      <Route path="/view-detail/:id" element={<DetailView />} />
      <Route path="/view-detail-topPicks/:id" element={<DetailView />} />
      <Route path="/view-detail-forensic/:_id" element={<DetailView />} />
      
    </Routes>
   </Router>
  );
}

export default App;
