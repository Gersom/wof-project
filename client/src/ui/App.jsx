// Imports React

import routerNames from '@common/constants/routes';

// Imports Router
import { Routes, Route } from 'react-router-dom';

// Imports Pages

import NotFound from './pages/NotFound';
import Landing from './pages/Landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import Offers from './pages/offers/Offers';
import Details from './pages/details/Details';
// Imports Components
// import SearchBar from "./components/SearchBar";

function App() {
	return (
		<div className='App'>
			<Routes>
				{/* Home */}
				<Route path={routerNames['landing']} element={<Landing />} />
				{/* Form */}
				{/* <Route path={routerNames["form"]} element={<Form />} /> */}
				{/* dashboard */}
				<Route path={routerNames['dashboard']} element={<Dashboard />}>
					<Route index path={routerNames['offers']} element={<Offers />} />
					<Route path={routerNames['details']} element={<Details />} />
					<Route path={routerNames['profile']} element={<Landing />} />
				</Route>
				{/* Not Found 404 */}
				<Route path={'*'} element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
