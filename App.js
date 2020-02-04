import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Cadastrar from './src/pages/Cadastrar';

const Navegador = createStackNavigator({
  Login: { screen: Login },
  Cadastrar: { screen: Cadastrar },
  Home: { screen: Home }
});

const AppContainer = createAppContainer(Navegador);

export default AppContainer;