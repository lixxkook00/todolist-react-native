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
    // hide header navigation
    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    }
  }
)


export default createAppContainer(Routers)
