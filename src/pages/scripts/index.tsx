import UseContextMain from './Context';

import Dashboard from './dashboard';
import Terminal from './terminal';

const DashboardPage = () => {
  return (
    <UseContextMain>
      <Dashboard />
      <Terminal />
    </UseContextMain>
  )
}

export default DashboardPage