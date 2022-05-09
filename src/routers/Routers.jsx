import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "../views/Home"
import Detail from "../views/Detail"

const Routers = createStackNavigator ({
    Home: {
        screen: Home,
    },
    Detail:{
      screen: Detail,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
)


export default createAppContainer(Routers)
