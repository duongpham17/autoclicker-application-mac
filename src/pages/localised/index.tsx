import UseContextMain from './Context';

import Scripts from './scripts';
import Terminal from './terminal';

const DashboardPage = () => {
  return (
    <UseContextMain>
      <Scripts />
      <Terminal />
    </UseContextMain>
  )
}

export default DashboardPage